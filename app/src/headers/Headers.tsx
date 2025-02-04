/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { ComponentType } from 'react'
import { MarketBuyHeader } from './MarketBuyHeader'
import { PlayCardHeader } from './PlayCardHeader'
import { SetupDraftHeader } from './SetupDraftHeader'
import { CitiesConstructionHeader } from './CitiesConstructionHeader'
import { SetupBuildHeader } from './SetupBuildHeader'
import { EmptinessHeader } from './EmptinessHeader'
import { VillagerHeader } from './VillagerHeader'
import { JesterHeader } from './JesterHeader'
import { AssassinHeader } from './AssassinHeader'
import { MerchantHeader } from './MerchantHeader'
import { KnightHeader } from './KnightHeader'
import { AstrologerHeader } from './AstrologerHeader'
import { AddCardInMarketHeader } from './AddCardInMarketHeader'
import { EndSeasonHeader } from './EndSeasonHeader'
import { CatchupBonusHeader } from './CatchupBonusHeader'
import { CityScoringHeader } from './CityScoringHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SetupDraft]: SetupDraftHeader,
  [RuleId.SetupBuild]:SetupBuildHeader,
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.PlayEmptiness]: EmptinessHeader,
  [RuleId.PlayVillager]: VillagerHeader,
  [RuleId.PlayJester]: JesterHeader,
  [RuleId.PlayAssassin]: AssassinHeader,
  [RuleId.PlayMerchant]: MerchantHeader,
  [RuleId.PlayKnight]: KnightHeader,
  [RuleId.PlayAstrologer]:AstrologerHeader,
  [RuleId.MarketBuy]: MarketBuyHeader,
  [RuleId.AddCardInMarket]:AddCardInMarketHeader,
  [RuleId.CitiesConstruction]:CitiesConstructionHeader,
  [RuleId.PurpleMajority]:CityScoringHeader,
  [RuleId.PurpleMajority]:CityScoringHeader,
  [RuleId.YellowMajority]:CityScoringHeader,
  [RuleId.PinkMajority]:CityScoringHeader,
  [RuleId.RedMajority]:CityScoringHeader,
  [RuleId.BlueMajority]:CityScoringHeader,
  [RuleId.GreenMajority]:CityScoringHeader,
  [RuleId.CatchupBonus]: CatchupBonusHeader,
  [RuleId.EndSeason]:EndSeasonHeader,
}
