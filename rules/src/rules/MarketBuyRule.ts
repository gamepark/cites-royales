import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Season } from '../material/Season'
import { getSubjectType } from '../material/Subject'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MarketBuyRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.remind(Memory.Revolution, this.player) && this.material(MaterialType.SubjectCard).location(LocationType.Market).length < 4) {
      return [this.startRule(RuleId.AddCardInMarket)]
    }
    this.memorize(Memory.PurchasingPower, this.getPurchasingPower())
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []

    const purchasingPower = this.remind(Memory.PurchasingPower)

    moves.push(
      ...this.material(MaterialType.SubjectCard)
        .location(LocationType.Market)
        .filter((item) => getSubjectType(item.id) <= purchasingPower)
        .moveItems({ type: LocationType.PlayerHand, player: this.player })
    )

    if (!this.remind(Memory.Revolution, this.player)) moves.push(this.startRule(RuleId.AddCardInMarket))

    return moves
  }

  getPurchasingPower() {
    return (
      this.material(MaterialType.SubjectCard).location(LocationType.Market).length +
      this.material(MaterialType.SubjectCard).location(LocationType.Reserve).length
    )
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerHand) {
      const moves: MaterialMove[] = []
      const card = this.material(MaterialType.SubjectCard).index(move.itemIndex).getItems()[0]
      const cardValue = getSubjectType(card.id)

      this.memorize(Memory.PurchasingPower, this.remind(Memory.PurchasingPower) - cardValue)
      if (!this.getIsBuying()) this.memorize(Memory.IsBuying, true, this.player)

      if (!this.playerCanBuy()) {
        this.forget(Memory.IsBuying)
        const playerToken = this.getPlayerToken()

        const season = this.getSeason()

        moves.push(...playerToken.moveItems({ type: LocationType.OnSeasonCards, id: season }))

        if (this.remind(Memory.Revolution, this.player)) {
          moves.push(this.material(MaterialType.HeroCard).player(this.player).rotateItem(true))
          this.forget(Memory.Revolution, this.player)
        }

        moves.push(
          this.everyPlayerHasBought(season)
            ? this.startSimultaneousRule(RuleId.CitiesConstruction)
            : this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
        )

        return moves
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
      .some((item) => getSubjectType(item.id) <= this.remind(Memory.PurchasingPower))
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
    this.forget(Memory.PurchasingPower)
    return []
  }
}
