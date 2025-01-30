import { isShuffle, ItemMove, MaterialDeck, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { sumBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { NobleColor } from '../NobleColor'
import { DeckHelper } from './DeckHelper'
import { RuleId } from './RuleId'

export class CatchupBonusRule extends PlayerTurnRule {
  onRuleStart() {
    const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
    const totalToDeal = sumBy(this.game.players, player => this.getPlayerCardsToDraw(player))
    if (totalToDeal > deck.length) {
      return new DeckHelper(this.game).renewDeck()
    } else {
      return [
        ...this.dealCatchupBonus(deck),
        this.nextRule
      ]
    }
  }

  dealCatchupBonus(deck: MaterialDeck) {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      const cardsToDraw = this.getPlayerCardsToDraw(player)

      if (cardsToDraw > 0) {
        moves.push(...deck.deal({ type: LocationType.PlayerHand, player }, cardsToDraw))
      }
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
    if (isShuffle(move)) {
      const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      return [
        ...this.dealCatchupBonus(deck),
        ...new DeckHelper(this.game).dealReserve(deck),
        this.nextRule
      ]
    }
    return []
  }
}