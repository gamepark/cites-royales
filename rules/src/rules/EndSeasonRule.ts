import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, Subject } from '../material/Subject'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class EndSeasonRule extends PlayerTurnRule {
  drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()

  onRuleStart() {
    const moves: MaterialMove[] = []

    moves.push(this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true))

    for (const player of this.game.players) {
      const cardsToDraw = this.getPlayerCardsToDraw(player)

      // TODO : ANIMATION_COMPLETE event received but not animation found with provided id -> Après construction peut pas passer
      // "You are trying to deal one card from an empty deck"
      if (cardsToDraw > 0) {
        console.log(this.drawPile)
        moves.push(...this.drawPile.deal({ type: LocationType.PlayerHand, player }, cardsToDraw))
      }
    }

    if (this.marketCards.length < 4) {
      moves.push(this.drawPile.dealOne({ type: LocationType.Market }))
    } else {
      moves.push(...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot }))
      moves.push(this.nextRule)
    }

    return moves
  }

  get season() {
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.id
  }

  get seasons() {
    return this.material(MaterialType.SeasonCard).length
  }

  get marketCards() {
    return this.material(MaterialType.SubjectCard).location(LocationType.Market)
  }

  getPlayerCardsToDraw(player: NobleColor) {
    const highestPlayerToken = this.material(MaterialType.NobleToken).maxBy(item => item.location.x!)
    const highestPlayerPoints = highestPlayerToken.getItem()?.location.x!

    if (highestPlayerToken.getItem()?.id !== player) {
      const playerPoints = this.material(MaterialType.NobleToken).id(player).getItem()?.location.x!
      let cardsToDraw = 0
      let bonusPoints

      if (this.game.players.length < 4) {
        bonusPoints = [10, 20, 30, 40, 50]
      } else {
        bonusPoints = [6, 12, 18, 24, 30, 36, 42, 48]
      }

      for (const bonus of bonusPoints) {
        if (bonus > playerPoints && bonus <= highestPlayerPoints) {
          cardsToDraw++
        }
      }
      return cardsToDraw
    } else return 0
  }

  get nextRule() {
    return this.season === this.seasons ? this.startRule(RuleId.EndGame) : this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
  }

  beforeItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      const newCardColor = getSubjectCity(this.material(move.itemType).getItem<Subject>(move.itemIndex).id)
      if (this.marketCards.getItems<Subject>().some(item => getSubjectCity(item.id) === newCardColor)) {
        moves.push(this.material(move.itemType).index(move.itemIndex).moveItem({ type: LocationType.Discard }))
        // TODO : ICI
        console.log(this.drawPile)
        moves.push(this.drawPile.dealOne({ type: LocationType.Market }))
      } else if (this.marketCards.length + 1 < 4) {
        moves.push(this.drawPile.dealOne({ type: LocationType.Market }))
      } else {
        moves.push(...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot }))
        moves.push(this.nextRule)
      }
    }

    return moves
  }

}