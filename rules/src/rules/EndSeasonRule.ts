import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class EndSeasonRule extends PlayerTurnRule {
  onRuleStart() {
    const moves:MaterialMove[] = []

    moves.push(...this.material(MaterialType.MarketToken).moveItems({type:LocationType.MarketTokenSpot}))

    moves.push(this.material(MaterialType.SeasonCard).id(this.season).rotateItem(true))


    // TODO : Couleur unique pour chaque carte du marché
    if(this.marketCardsToDeal > 0){
      const drawPile = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      moves.push(...drawPile.deal({ type: LocationType.Market }, this.marketCardsToDeal))
    }

    for(const player of this.game.players){
      const cardsToDraw = this.getPlayerCardsToDraw(player)
      console.log(cardsToDraw)
    }

    moves.push(this.nextRule)


    return moves
  }

  get season(){
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.id
  }

  get seasons() {
    return this.material(MaterialType.SeasonCard).length
  }

  get marketCardsToDeal() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market).length;
    const difference = 4 - marketCards;
    return difference > 0 ? difference : 0;
  }

  getPlayerCardsToDraw(player:NobleColor) {
    const highestPlayer = this.material(MaterialType.NobleToken).maxBy(item => item.location.x!)
    const highestPlayerPoints = highestPlayer.getItem()?.location.x!

    if(highestPlayer.getItem()?.id === player){
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
    return this.season === this.seasons ? this.endGame() : this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
  }


}