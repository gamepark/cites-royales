import { isMoveItemType, isShuffle, ItemMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, Subject } from '../material/Subject'
import { DeckHelper } from './DeckHelper'
import { RuleId } from './RuleId'


export class EndSeasonRule extends PlayerTurnRule {
  onRuleStart() {
    return this.completeMarketIfNeeded()
  }

  get deck() {
    return this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
  }

  completeMarketIfNeeded(deck = this.deck) {
    if (this.marketCards.length < 4 && !this.isEndGame) {
      return [deck.dealOne({ type: LocationType.Market })]
    } else {
      return [
        this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true),
        this.startRule(RuleId.CatchupBonus),
        ...this.material(MaterialType.MarketToken).moveItems({ type: LocationType.MarketTokenSpot })
      ]
    }
  }

  get isEndGame(){
    if(this.game.players.length < 4){
      return this.material(MaterialType.SeasonCard).rotation(true).length === 3
    } else {
      return this.material(MaterialType.SeasonCard).rotation(true).length === 4
    }
  }

  get season() {
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.id
  }

  get marketCards() {
    return this.material(MaterialType.SubjectCard).location(LocationType.Market)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move)) {
      const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      if (move.location.type === LocationType.Market) {
        const newCardColor = getSubjectCity(this.material(move.itemType).getItem<Subject>(move.itemIndex).id)
        if (this.marketCards.index(index => index !== move.itemIndex).getItems<Subject>().some(item => getSubjectCity(item.id) === newCardColor)) {
          return [this.material(move.itemType).index(move.itemIndex).moveItem({ type: LocationType.Discard })]
        } else {
          return this.completeMarketIfNeeded()
        }
      } else if (move.location.type === LocationType.Discard) {
        if (drawPile.length > 0) {
          return [drawPile.dealOne({ type: LocationType.Market })]
        } else {
          return new DeckHelper(this.game).renewDeck()
        }
      } else if (isShuffle(move)) {
        const deck = this.deck
        return [
          ...new DeckHelper(this.game).dealReserve(deck),
          ...this.completeMarketIfNeeded(deck)
        ]
      }
    }
    return []
  }
}
