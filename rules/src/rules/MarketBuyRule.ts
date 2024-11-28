import {
  isMoveItemType,
  ItemMove,
  MaterialMove,
  PlayerTurnRule,
  PlayMoveContext,
  RuleMove,
  RuleStep
} from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Season } from '../material/Season'
import { getSubjectType } from '../material/Subject'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MarketBuyRule extends PlayerTurnRule {
  onRuleStart(_move: RuleMove<number, RuleId>, _previousRule?: RuleStep, _context?: PlayMoveContext) {
    this.memorize(Memory.PurshasingPower, this.getPurshasingPower())
    return []
  }
  getPlayerMoves() {
    const moves: MaterialMove[] = []

    const purshasingPower = this.remind(Memory.PurshasingPower)

    if (this.getIsBuying()) {
      moves.push(
        ...this.material(MaterialType.SubjectCard)
          .location(LocationType.Market)
          .filter((item) => getSubjectType(item.id) <= purshasingPower)
          .moveItems({ type: LocationType.PlayerHand, player: this.player })
      )
    } else {
      if (purshasingPower >= 8) {
        moves.push(
          ...this.material(MaterialType.SubjectCard)
            .location(LocationType.Market)
            .filter((item) => getSubjectType(item.id) <= purshasingPower)
            .moveItems({ type: LocationType.PlayerHand, player: this.player })
        )
      }
    }

    moves.push(this.startRule(RuleId.AddCardInMarket))

    return moves
  }

  getPurshasingPower() {
    return (
      this.material(MaterialType.SubjectCard).location(LocationType.Market).length +
      this.material(MaterialType.SubjectCard).location(LocationType.Reserve).length
    )
  }
  afterItemMove(move: ItemMove<number, number, number>, _context?: PlayMoveContext) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand) {
      const card = this.material(MaterialType.SubjectCard).index(move.itemIndex).getItems()[0]
      const cardValue = getSubjectType(card.id)

      this.memorize(Memory.PurshasingPower, this.remind(Memory.PurshasingPower) - cardValue)
      if (!this.getIsBuying()) this.memorize(Memory.IsBuying, true, this.player)

      if (!this.playerCanBuy()) {
        this.forget(Memory.IsBuying)
        const playerToken = this.getPlayerToken()

        const season = this.getSeason()

        return [
          ...playerToken.moveItems({ type: LocationType.OnSeasonCards, id: season }),
          this.everyPlayerHasBought(season)
            ? this.startSimultaneousRule(RuleId.CitiesConstruction)
            : this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
        ]
      }
    }

    return []
  }
  getIsBuying() {
    return this.remind(Memory.IsBuying, this.player)
  }
  getPlayerToken() {
    return this.material(MaterialType.MarketToken).id(this.player)
  }
  getSeason() {
    return this.material(MaterialType.SeasonCard)
      .location((l) => !l.rotation)
      .minBy((item) => item.location.x!)
      .getItem<Season>()!.id
  }
  playerCanBuy() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.Market)
      .getItems()
      .some((item) => getSubjectType(item.id) <= this.remind(Memory.PurshasingPower))
  }
  everyPlayerHasBought(season: Season) {
    return (
      this.game.players.length ===
      this.material(MaterialType.MarketToken)
        .location(LocationType.OnSeasonCards)
        .getItems()
        .filter((token) => token.location.id === season).length
    )
  }
  onRuleEnd() {
    this.forget(Memory.PurshasingPower)
    return []
  }
}
