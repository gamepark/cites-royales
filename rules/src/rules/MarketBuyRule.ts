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
    this.memorize(Memory.PurchasingPower, this.getPurchasingPower())
    this.memorize(Memory.BoughtCards, [], this.player)
    return []
  }

  getPlayerMoves() {
    const moves: MaterialMove[] = []
    const playerHasAlreadyBoughtThisSeason = this.playerHasAlreadyBought
    if(playerHasAlreadyBoughtThisSeason){
      this.memorize(Memory.hasAlreadyBoughtThisSeason, true)
    }

    const purchasingPower = this.remind(Memory.PurchasingPower)

    if(this.remind(Memory.Revolution) || this.material(MaterialType.SubjectCard).location(LocationType.Market).length >= 4 && !playerHasAlreadyBoughtThisSeason){
      moves.push(
        ...this.material(MaterialType.SubjectCard)
          .location(LocationType.Market)
          .filter((item) => getSubjectType(item.id) <= purchasingPower)
          .moveItems({ type: LocationType.ActionHand, player: this.player })
      )
    }

    if (this.hasBought || !this.remind(Memory.Revolution) || playerHasAlreadyBoughtThisSeason) {
      moves.push(this.customMove(CustomMoveType.Pass))
    }

    return moves
  }



  getPurchasingPower() {
    return this.remind(Memory.PurchasingPower) ? this.remind(Memory.PurchasingPower) : (
      this.material(MaterialType.SubjectCard).location(LocationType.Market).length +
      this.material(MaterialType.SubjectCard).location(LocationType.Reserve).length
    )
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.ActionHand) {
      const card = this.material(MaterialType.SubjectCard).index(move.itemIndex).getItems()[0]
      const cardValue = getSubjectType(card.id)
      this.remind<number[]>(Memory.BoughtCards, move.location.player).push(card.id)
      this.memorize<number>(Memory.PurchasingPower, purchasingPower => purchasingPower - cardValue)
      this.memorize(Memory.hasBought, true)
    }

    return []
  }

  get hasBought() {
    return this.remind(Memory.hasBought)
  }

  get season() {
    return this.material(MaterialType.SeasonCard)
      .location((l) => !l.rotation)
      .minBy((item) => item.location.x!)
      .getItem<Season>()!.id
  }
  get playerMarketToken() {
    return this.material(MaterialType.MarketToken).id(this.player)
  }
  get playerHasAlreadyBought() {
    return this.playerMarketToken.location(location => location.type === LocationType.OnSeasonCards).length > 0
  }
  get everyOtherPlayersHaveBought() {
    return this.material(MaterialType.MarketToken).id(id => id !== this.player).location(LocationType.OnSeasonCards).length === this.game.players.length - 1
  }

  get cardsPlayerCanBuy(){
    const purchasingPower = this.remind(Memory.PurchasingPower)

    return this.material(MaterialType.SubjectCard)
      .location(LocationType.Market)
      .filter((item) => getSubjectType(item.id) <= purchasingPower).length
  }

  get isRevolt(){
    return this.remind(Memory.Revolution)
  }

  onCustomMove(move: CustomMove) {
    if (move.type !== CustomMoveType.Pass) return []

    if (this.hasBought) {
      const moves: MaterialMove[] = [
        this.playerMarketToken.moveItem({ type: LocationType.OnSeasonCards, id: this.season })
      ]

      if (this.remind(Memory.Revolution)) {
        const heroCard = this.material(MaterialType.HeroCard).player(this.player)
        if (!heroCard.getItem()?.location.rotation) {
          moves.push(heroCard.rotateItem(true))
        }
      }
      moves.push(...this.playerCardsInActionHand.moveItems({ type: LocationType.PlayerHand, player: this.player }))

      if (this.everyOtherPlayersHaveBought) {
        moves.push(this.startSimultaneousRule(RuleId.CitiesConstruction))
        this.memorize(Memory.LastPlayerToBuy, this.player)
      } else {
        moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
      }

      return moves
    } else {
      return [this.startRule(RuleId.AddCardInMarket)]
    }
  }

  get playerCardsInActionHand(){
    return this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player)
  }

  onRuleEnd() {
    this.forget(Memory.PurchasingPower)
    this.forget(Memory.BoughtCards)
    this.forget(Memory.hasBought)
    this.forget(Memory.Revolution)
    this.forget(Memory.hasAlreadyBoughtThisSeason)
    return []
  }
}
