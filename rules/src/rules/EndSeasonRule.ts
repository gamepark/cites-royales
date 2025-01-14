import { PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'

export class EndSeasonRule extends PlayerTurnRule {
  onRuleStart() {
    const currentSeason = this.getCurrentSeason()
    console.log(currentSeason)

    return []
  }

  getCurrentSeason(){
    const marketTokens = this.material(MaterialType.MarketToken).location(LocationType.OnSeasonCards)
    return marketTokens.getItems()[0].location.x
  }
}