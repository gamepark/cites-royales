import {
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit,
} from "@gamepark/rules-api";
import { LocationType } from "./material/LocationType";
import { MaterialType } from "./material/MaterialType";
import { NobleColor } from "./NobleColor";
import { RuleId } from "./rules/RuleId";
import { TheFirstStepRule } from "./rules/TheFirstStepRule";

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CitesRoyalesRules
  extends SecretMaterialRules<NobleColor, MaterialType, LocationType>
  implements
    TimeLimit<
      MaterialGame<NobleColor, MaterialType, LocationType>,
      MaterialMove<NobleColor, MaterialType, LocationType>,
      NobleColor
    >
{
  rules = {
    [RuleId.TheFirstStep]: TheFirstStepRule,
  };

  locationsStrategies = {
    [MaterialType.SeasonCard]: {
      [LocationType.SeasonsCardsStack]: new PositiveSequenceStrategy(),
    },
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy(),
      [LocationType.Market]: new PositiveSequenceStrategy(),
    },
    [MaterialType.MarketHalfSizedCard]: {
      [LocationType.MarketLineBeginning]: new PositiveSequenceStrategy(),
    },
  };

  hidingStrategies = {
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: hideItemId,
      [LocationType.Reserve]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
    },
  };

  giveTime(): number {
    return 60;
  }
}
