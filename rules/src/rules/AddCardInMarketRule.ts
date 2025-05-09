import {
  CustomMove,
  isMoveItemType,
  isShuffle,
  ItemMove,
  Material,
  MaterialMove,
  MoveItem,
  PlayerTurnRule
} from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, getSubjectRule, Subject } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'
import { DeckHelper } from './DeckHelper'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

export class AddCardInMarketRule extends PlayerTurnRule {
  drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()

  onRuleStart() {
    if(this.drawPile.length === 0) {
      return new DeckHelper(this.game).renewDeck()
    } else if(!this.playerHeroAvailable) {
      return [this.drawPile.dealOne({ type: LocationType.Market })]
    }

    return []
  }

  get playerHeroAvailable() {
    return this.material(MaterialType.HeroCard).player(this.player).rotation(true).length > 0
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playerActionHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player)


    if (playerActionHand.length < 1 && this.playerHeroAvailable) {
      return [this.material(MaterialType.HeroCard).player(this.player).rotateItem(false), this.customMove(CustomMoveType.Pass)]
    } else {
      return [...this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player).moveItems({ type: LocationType.Market })]
    }
  }

  beforeItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move)
      && this.material(MaterialType.SubjectCard).getItem(move.itemIndex).location.type === LocationType.DrawPile
      && this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).length === 1) {
      return new DeckHelper(this.game).renewDeck()
    }
    return []
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.HeroCard)(move)) {
      const deck = this.drawPile
      return deck.deal({ type: LocationType.ActionHand, player: this.player }, 2)
    } else if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      return this.afterSubjectToMarket(move)
    } else if (isShuffle(move)) {
      const moves: MaterialMove[] = []
      const deck = this.drawPile
      moves.push(...new DeckHelper(this.game).dealReserve(deck))
      if (this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).length === 1) {
        moves.push(deck.dealOne({ type: LocationType.ActionHand, player: this.player }))
      } else if(!this.playerHeroAvailable){
        moves.push(this.drawPile.dealOne({ type: LocationType.Market }))
      }
      return moves
    }
    return []
  }

  afterSubjectToMarket(move: MoveItem) {
    const moves: MaterialMove[] = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player).moveItems({ type: LocationType.Discard })

    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    if (marketCards.length <= 4) {
      moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
    } else {
      const card = this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex)
      const subjectCity = getSubjectCity(card.id)
      const sameCitySubjects = this.material(MaterialType.SubjectCard).location(LocationType.Market).id<Subject>(id => getSubjectCity(id) === subjectCity)
      if (sameCitySubjects.length >= 3) {
        moves.push(...this.triggerRevolution(sameCitySubjects, move.itemIndex))
      } else {
        if (!this.playerHasAlreadyBought && this.getMarketHasTwoCardsOfSameColor(move.itemIndex)) {
          const pointsToGive = this.victoryPointsToGive
          if (pointsToGive > 0) {
            moves.push(
              ...this.material(MaterialType.NobleToken)
                .id(this.player)
                .moveItems((item) => ({
                  type: LocationType.VictoryPointsSpace,
                  x: item.location.x! + pointsToGive
                }))
            )
            this.memorize(Memory.PointsToGive, pointsToGive)
          }
        }
        moves.push(this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer))
      }
    }

    return moves
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [this.drawPile.dealOne({ type: LocationType.Market })]
    }
    return []
  }

  triggerRevolution(sameCitySubjects: Material, cardIndex: number) {
    this.memorize(Memory.Revolution, true)
    const moves: MaterialMove[] = sameCitySubjects.index(index => index !== cardIndex).moveItems({ type: LocationType.Discard })

    if (this.playerHasAlreadyBought) {
      const subject = sameCitySubjects.index(index => index !== cardIndex).minBy(card => card.id).getItem<Subject>()!.id
      moves.push(this.startRule(getSubjectRule(subject)))
    } else {
      const pointsToGive = this.victoryPointsToGive
      if (pointsToGive > 0) {
        moves.push(
          ...this.material(MaterialType.NobleToken)
            .id(id => id !== this.player)
            .moveItems((item) => ({
              type: LocationType.VictoryPointsSpace,
              x: item.location.x! + pointsToGive
            }))
        )
        this.memorize(Memory.PointsToGive, pointsToGive)
      }
      moves.push(this.startRule(RuleId.MarketBuy))
    }

    return moves
  }

  get victoryPointsToGive() {
    const marketCardsNumber = this.marketCardsNumber
    if (marketCardsNumber > 12) return 3
    if (marketCardsNumber > 8) return 2
    if (marketCardsNumber > 4) return 1
    return 0
  }

  getMarketHasTwoCardsOfSameColor(cardIndex: number) {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market).index(index => index !== cardIndex)
    const colorFound = new Map<number, boolean>()

    for (const card of marketCards.getItems()) {
      const color = getSubjectCity(card.id) || 0
      if (colorFound.get(color)) return true
      colorFound.set(color, true)
    }

    return false
  }

  get playerMarketToken() {
    return this.material(MaterialType.MarketToken).id(this.player)
  }

  get playerHasAlreadyBought() {
    return this.playerMarketToken.location((location) => location.type === LocationType.OnSeasonCards).length > 0
  }

  get marketCardsNumber() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    return marketCards.length
  }

  onRuleEnd() {
    this.forget(Memory.PointsToGive)
    return []
  }
}
