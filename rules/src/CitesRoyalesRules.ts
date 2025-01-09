import {
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  TimeLimit
} from '@gamepark/rules-api'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { NobleColor } from './NobleColor'
import { AddCardInMarketRule } from './rules/AddCardInMarketRule'
import { MarketBuyRule } from './rules/MarketBuyRule'
import { PlayCardRule } from './rules/PlayCardRule'
import { PlayAssassinRule } from './rules/playCards/PlayAssassinRule'
import { PlayAstrologerRule } from './rules/playCards/PlayAstrologerRule'
import { PlayEmptinessRule } from './rules/playCards/PlayEmptinessRule'
import { PlayJesterRule } from './rules/playCards/PlayJesterRule'
import { PlayKnightRule } from './rules/playCards/PlayKnightRule'
import { PlayMerchantRule } from './rules/playCards/PlayMerchantRule'
import { PlayVillagerRule } from './rules/playCards/PlayVillagerRule'
import { RuleId } from './rules/RuleId'
import { SetupBuildRule } from './rules/SetupBuildRule'
import { SetupDraftRule } from './rules/SetupDraftRule'
import { StackingStrategy } from './rules/utils/StackingStrategy'
import { CitiesConstructionRule } from './rules/CitiesConstructionRule'
import { PurpleCityScoring } from './rules/majoritiesChecks/PurpleCityScoring'

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
    [RuleId.PlayKnight]: PlayKnightRule,
    [RuleId.PlayAstrologer]: PlayAstrologerRule,
    [RuleId.MarketBuy]: MarketBuyRule,
    [RuleId.AddCardInMarket]: AddCardInMarketRule,
    [RuleId.CitiesConstruction]:CitiesConstructionRule,
    [RuleId.PurpleMajority]: PurpleCityScoring,
  }

  locationsStrategies = {
    [MaterialType.SeasonCard]: {
      [LocationType.SeasonsCardsStack]: new PositiveSequenceStrategy()
    },
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: new PositiveSequenceStrategy(),
      [LocationType.Reserve]: new PositiveSequenceStrategy(),
      [LocationType.Market]: new PositiveSequenceStrategy(),
      [LocationType.Discard]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHand]: new PositiveSequenceStrategy(),
      [LocationType.InCity]: new PositiveSequenceStrategy(),
      [LocationType.ActionHand]: new PositiveSequenceStrategy()
    },
    [MaterialType.MarketHalfSizedCard]: {
      [LocationType.MarketLineBeginning]: new PositiveSequenceStrategy()
    },
    [MaterialType.NobleToken]: {
      [LocationType.VictoryPointsSpace]: new StackingStrategy()
    },
    [MaterialType.MarketToken]: {
      [LocationType.MarketTokenSpot]: new StackingStrategy(),
      [LocationType.OnSeasonCards]: new StackingStrategy()
    }
  }

  hidingStrategies = {
    [MaterialType.SubjectCard]: {
      [LocationType.DrawPile]: hideItemId,
      [LocationType.Reserve]: hideItemId,
      [LocationType.PlayerHand]: hideItemIdToOthers,
      [LocationType.PlayerArea]: hideItemId,
      [LocationType.ActionHand]: hideItemIdToOthers
    }
  }

  giveTime(): number {
    return 60
  }
}
