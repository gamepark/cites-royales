import { MaterialGame, MaterialMove, MaterialRules, PositiveSequenceStrategy, TimeLimit } from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { NobleColor } from './NobleColor'
import { TheFirstStepRule } from './rules/TheFirstStepRule'
import { RuleId } from './rules/RuleId'


/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CitesRoyalesRules extends MaterialRules<NobleColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<NobleColor, MaterialType, LocationType>, MaterialMove<NobleColor, MaterialType, LocationType>, NobleColor> {
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule
  }

  locationsStrategies = {
    [MaterialType.SeasonCard]: {
      [LocationType.SeasonsCardsStack]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}