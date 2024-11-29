import { CustomMove, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Season } from '../material/Season'
import { getSubjectType } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class MarketBuyRule extends PlayerTurnRule {
  onRuleStart() {
    if (!this.remind(Memory.Revolution) && this.material(MaterialType.SubjectCard).location(LocationType.Market).length < 4) {
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

    if (this.hasBought || !this.remind(Memory.Revolution)) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

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
      const card = this.material(MaterialType.SubjectCard).index(move.itemIndex).getItems()[0]
      const cardValue = getSubjectType(card.id)
      this.memorize(Memory.PurchasingPower, purchasingPower => purchasingPower - cardValue)
      this.memorize(Memory.hasBought, true)
    }

    return []
  }

  get hasBought() {
    return this.remind(Memory.hasBought)
  }

  get playerToken() {
    return this.material(MaterialType.MarketToken).id(this.player)
  }

  get season() {
    return this.material(MaterialType.SeasonCard)
      .location((l) => !l.rotation)
      .minBy((item) => item.location.x!)
      .getItem<Season>()!.id
  }

  get everyPlayerHasBought() {
    return this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards).length === this.game.players.length
  }

  onCustomMove(move: CustomMove) {
    if (move.type !== CustomMoveType.Pass) return []

    if (this.hasBought) {
      const moves: MaterialMove[] = [
        this.playerToken.moveItem({ type: LocationType.OnSeasonCards, id: this.season })
      ]

      if (this.remind(Memory.Revolution)) {
        const heroCard = this.material(MaterialType.HeroCard).player(this.player)
        if (!heroCard.getItem()?.location.rotation) {
          moves.push(heroCard.rotateItem(true))
        }
      }

      if (this.everyPlayerHasBought) {
        moves.push(this.startSimultaneousRule(RuleId.CitiesConstruction))
      } else {
        moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
      }

      return moves
    } else {
      return [this.startRule(RuleId.AddCardInMarket)]
    }
  }

  onRuleEnd() {
    this.forget(Memory.PurchasingPower)
    this.forget(Memory.hasBought)
    this.forget(Memory.Revolution)
    return []
  }
}
