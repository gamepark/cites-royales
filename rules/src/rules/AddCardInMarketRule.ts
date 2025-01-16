import {CustomMove, isMoveItemType, ItemMove, Material, MaterialMove, PlayerTurnRule} from '@gamepark/rules-api'
import {LocationType} from '../material/LocationType'
import {MaterialType} from '../material/MaterialType'
import {getSubjectCity, getSubjectRule, Subject} from '../material/Subject'
import {Memory} from './Memory'
import {RuleId} from './RuleId'
import {CustomMoveType} from './CustomMoveType'

export class AddCardInMarketRule extends PlayerTurnRule {
  drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
  onRuleStart() {

    const playerHeroAvailable = this.playerHeroAvailable
    if(playerHeroAvailable) return []

    return [this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .dealOne({ type: LocationType.Market })]
  }

  get playerHeroAvailable() {
    return this.material(MaterialType.HeroCard).player(this.player).rotation(true).length > 0
  }

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    const playerActionHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player)


    if(playerActionHand.length < 1 && this.playerHeroAvailable) {
      return [this.material(MaterialType.HeroCard).player(this.player).rotateItem(false), this.customMove(CustomMoveType.Pass)]
    } else {
      return [...this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player).moveItems({type:LocationType.Market})]
    }
  }

  afterItemMove(move:ItemMove) {
    if(isMoveItemType(MaterialType.HeroCard)(move)){
      return [...this.drawPile.deal({type:LocationType.ActionHand, player:this.player}, 2)]
    } else if(isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      const playerActionHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player)
      if(playerActionHand.length > 0) {
        return [...this.material(MaterialType.SubjectCard).location(LocationType.ActionHand).player(this.player).moveItems({type:LocationType.Discard}), this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
      } else return []
    } else {
      return []
    }
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.Market) return []
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    if(marketCards.length < 3) return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]


    const card = this.material(MaterialType.SubjectCard).getItem<Subject>(move.itemIndex)
    const subjectCity = getSubjectCity(card.id)
    const sameCitySubjects = this.material(MaterialType.SubjectCard).location(LocationType.Market).id<Subject>(id => getSubjectCity(id) === subjectCity)

    if(sameCitySubjects.length >= 2) {
      return this.triggerRevolution(sameCitySubjects)
    } else {
      const moves:MaterialMove[]=[]
      if (!this.playerHasAlreadyBought && this.marketHasTwoCardsOfSameColor) {
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
        }
      }
      return moves
    }
  }

  onCustomMove(move: CustomMove): MaterialMove<number, number, number>[] {
    if (move.type !== CustomMoveType.Pass) return [this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)]
    return []
  }

  triggerRevolution(sameCitySubjects: Material){
    this.memorize(Memory.Revolution, true)
    const moves:MaterialMove[] = sameCitySubjects.moveItems({type:LocationType.Discard})

    if(this.playerHasAlreadyBought){
      const subject = sameCitySubjects.minBy(card => card.id).getItem<Subject>()!.id
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
      }
      moves.push(this.startRule(RuleId.MarketBuy))
    }

    return moves
  }

  get victoryPointsToGive() {
    const marketCardsNumber = this.marketCardsNumber
    if (marketCardsNumber >= 12) return 3
    if (marketCardsNumber >= 8) return 2
    if (marketCardsNumber >= 4) return 1
    return 0
  }

  get marketHasTwoCardsOfSameColor() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)
    const colorFound = new Map<number, boolean>()

    for (const card of marketCards.getItems()) {
      const color = getSubjectCity(card.id) || 0
      if(colorFound.get(color)) return true
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
}
