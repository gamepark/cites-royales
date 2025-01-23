import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, Subject } from '../material/Subject'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'


export class EndSeasonRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []

    moves.push(this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true))

    const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
    for (const player of this.game.players) {
      const cardsToDraw = this.getPlayerCardsToDraw(player)

      if (cardsToDraw > 0) {
        moves.push(...drawPile.deal({ type: LocationType.PlayerHand, player }, cardsToDraw))
      }
    }

    if (this.marketCards.length < 4) {
      moves.push(drawPile.dealOne({ type: LocationType.Market }))
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

  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      const newCardColor = getSubjectCity(this.material(move.itemType).getItem<Subject>(move.itemIndex).id)
      const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      if (this.marketCards.index(index => index !== move.itemIndex).getItems<Subject>().some(item => getSubjectCity(item.id) === newCardColor)) {
        moves.push(this.material(move.itemType).index(move.itemIndex).moveItem({ type: LocationType.Discard }))
        moves.push(drawPile.dealOne({ type: LocationType.Market }))
      } else if (this.marketCards.length < 4) {
        moves.push(drawPile.dealOne({ type: LocationType.Market }))
      } else {
        moves.push(...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot }))
        moves.push(this.nextRule)
      }
    }

    return moves
  }

}