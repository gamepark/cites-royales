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
import { MerchantHeader } from './MechantHeader'
import { KnightHeader } from './KnightHeader'
import { AstrologerHeader } from './AstrologerHeader'

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
  [RuleId.CitiesConstruction]:CitiesConstructionHeader
}
