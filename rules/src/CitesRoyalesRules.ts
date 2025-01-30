import {
  CompetitiveScore,
  hideItemId,
  hideItemIdToOthers,
  isMoveItem, isStartPlayerTurn,
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
import { CitiesConstructionRule } from './rules/CitiesConstructionRule'
import { EndGameRule } from './rules/EndGameRule'
import { EndSeasonRule } from './rules/EndSeasonRule'
import { BlueCityScoring } from './rules/majoritiesChecks/BlueCityScoring'
import { GreenCityScoring } from './rules/majoritiesChecks/GreenCityScoring'
import { PinkCityScoring } from './rules/majoritiesChecks/PinkCityScoring'
import { PurpleCityScoring } from './rules/majoritiesChecks/PurpleCityScoring'
import { RedCityScoring } from './rules/majoritiesChecks/RedCityScoring'
import { YellowCityScoring } from './rules/majoritiesChecks/YellowCityScoring'
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

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class CitesRoyalesRules
  extends SecretMaterialRules<NobleColor, MaterialType, LocationType>
  implements TimeLimit<
    MaterialGame<NobleColor, MaterialType, LocationType>,
    MaterialMove<NobleColor, MaterialType, LocationType>,
    NobleColor
  >, CompetitiveScore<
    MaterialGame<NobleColor, MaterialType, LocationType>,
    MaterialMove<NobleColor, MaterialType, LocationType>,
    NobleColor> {
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
    [RuleId.CitiesConstruction]: CitiesConstructionRule,
    [RuleId.PurpleMajority]: PurpleCityScoring,
    [RuleId.YellowMajority]: YellowCityScoring,
    [RuleId.PinkMajority]: PinkCityScoring,
    [RuleId.RedMajority]: RedCityScoring,
    [RuleId.BlueMajority]: BlueCityScoring,
    [RuleId.GreenMajority]: GreenCityScoring,
    [RuleId.EndSeason]: EndSeasonRule,
    [RuleId.EndGame]: EndGameRule
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

  getScore(player: NobleColor) {
    return this.material(MaterialType.NobleToken).player(player).getItem()!.location.x!
  }

  getTieBreaker(tieBreaker: number, player: NobleColor) {
    if (tieBreaker === 1) {
      return this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player).length
    }
    return
  }

  keepMoveSecret(move: MaterialMove<NobleColor, MaterialType, LocationType>, player: NobleColor): boolean {
    if (this.game.rule?.id === RuleId.CitiesConstruction) {
      if (isMoveItem(move) && move.itemType === MaterialType.SubjectCard && move.location.type === LocationType.InCity) {
        return move.location.player !== player
      }
    }
    return false
  }

  /**
   * CitiesConstructionRule getMovesAfterPlayersDone consequence must be unpredictable because we keep construction moves secret: players cannot predict
   * who will have the majorities before the construction moves are collected.
   */
  isUnpredictableMove(move: MaterialMove<NobleColor, MaterialType, LocationType>, player: NobleColor): boolean {
    return super.isUnpredictableMove(move, player) || (isStartPlayerTurn(move) && move.id === RuleId.PurpleMajority)
  }
}
