import {
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit,
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { NobleColor } from './NobleColor'
import { PlayAssassinRule } from './rules/PlayAssassinRule'
import { PlayCardRule } from './rules/PlayCardRule'
import { PlayEmptinessRule } from './rules/PlayEmptinessRule'
import { PlayJesterRule } from './rules/PlayJesterRule'
import { PlayKnightesterRule } from './rules/PlayKnightRule'
import { PlayMerchantRule } from './rules/PlayMerchantRule'
import { PlayVillagerRule } from './rules/PlayVillagerRule'
import { RuleId } from './rules/RuleId'
import { SetupBuildRule } from './rules/SetupBuildRule'
import { SetupDraftRule } from './rules/SetupDraftRule'
import { StakingStrategy } from './rules/utils/StackingStrategy'

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
    [RuleId.SetupDraft]: SetupDraftRule,
    [RuleId.SetupBuild]: SetupBuildRule,
    [RuleId.PlayCard]: PlayCardRule,
    [RuleId.PlayEmptiness]: PlayEmptinessRule,
    [RuleId.PlayVillager]: PlayVillagerRule,
    [RuleId.PlayJester]: PlayJesterRule,
    [RuleId.PlayAssassin]: PlayAssassinRule,
    [RuleId.PlayMerchant]: PlayMerchantRule,
    [RuleId.PlayKnight]: PlayKnightesterRule,
  }

  locationsStrategies = {
    [MaterialType.SeasonCard]: {
      [LocationType.SeasonsCardsStack]: new PositiveSequenceStrategy(),
    },
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy(),
      [LocationType.Market]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.InCity]: new PositiveSequenceStrategy(),
    },
    [MaterialType.MarketHalfSizedCard]: {
      [LocationType.MarketLineBeginning]: new PositiveSequenceStrategy(),
    },
    [MaterialType.NobleToken]: {
      [LocationType.VictoryPointsSpace]: new StakingStrategy(),
    },
    [MaterialType.MarketToken]: {
      [LocationType.MarketTokenSpot]: new StakingStrategy(),
    },
  }

  hidingStrategies = {
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: hideItemId,
      [LocationType.Reserve]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
      [LocationType.PlayerArea]: hideItemId,
    },
  }

  giveTime(): number {
    return 60
  }
}
