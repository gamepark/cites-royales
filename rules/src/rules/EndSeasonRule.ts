import {isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule} from '@gamepark/rules-api'
import {MaterialType} from '../material/MaterialType'
import {LocationType} from '../material/LocationType'
import {NobleColor} from '../NobleColor'
import {RuleId} from './RuleId'
import {getSubjectCity, Subject} from "../material/Subject";
import {cities} from "../material/City";

export class EndSeasonRule extends PlayerTurnRule {
    drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
  onRuleStart() {
    const moves:MaterialMove[] = []

    moves.push(this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true))

    for(const player of this.game.players){
      const cardsToDraw = this.getPlayerCardsToDraw(player)

        if(cardsToDraw > 0){


            moves.push(...this.drawPile.deal({type:LocationType.PlayerHand, player}, cardsToDraw))
        }
    }

    moves.push(this.dealCardInMarket())

    moves.push(...this.material(MaterialType.MarketToken).moveItems({type:LocationType.MarketTokenSpot}))


    return moves
  }

  get season(){
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.id
  }

  get seasons() {
    return this.material(MaterialType.SeasonCard).length
  }

 dealCardInMarket() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market).length

    if(marketCards >= 4 && this.marketCardsToDiscard.length < 1) {
      return this.nextRule
    } else {
      return this.drawPile.dealOne({ type: LocationType.Market })
    }
  }

  getPlayerCardsToDraw(player:NobleColor) {
    const highestPlayerToken = this.material(MaterialType.NobleToken).maxBy(item => item.location.x!)
    const highestPlayerPoints = highestPlayerToken.getItem()?.location.x!

    if(highestPlayerToken.getItem()?.id !== player){
      const playerPoints = this.material(MaterialType.NobleToken).id(player).getItem()?.location.x!
      let cardsToDraw = 0
      let bonusPoints

      if(this.game.players.length < 4){
        bonusPoints = [10, 20, 30, 40, 50]
      } else {
        bonusPoints = [6, 12, 18, 24, 30, 36, 42, 48]
      }

      for (const bonus of bonusPoints) {
        if (bonus > playerPoints && bonus <= highestPlayerPoints) {
          cardsToDraw++;
        }
      }
      return cardsToDraw
    } else return 0
  }

  get nextRule(){
    return this.season === this.seasons ? this.startRule(RuleId.EndGame) : this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
  }

  get marketCardsToDiscard() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market);
    const marketCardsItems = marketCards.getItems();

    const cardsToDiscard = cities.flatMap(city => {
        let cityFound = false;

        const marketCityCards = marketCards
            .id<Subject>(id => getSubjectCity(id) === city)
            .sort(item => item.location.x!);

        return marketCityCards.filter(card => {
            if (!cityFound) {
                cityFound = true;
                return false;
            }
            return marketCardsItems.some(
                item => getSubjectCity(card.id) === getSubjectCity(item.id)
            );
        }).getItems();
    });

    return marketCards.id<Subject>(id => cardsToDiscard.some(item => item.id === id));
    }



    afterItemMove(move: ItemMove) {
    const moves:MaterialMove[] = []
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.Market) {
      moves.push(...this.marketCardsToDiscard.moveItems({ type: LocationType.Discard }))
      moves.push(this.dealCardInMarket())
    }

    return moves
  }

}