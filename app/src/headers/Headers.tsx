/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { ComponentType } from 'react'
import { MarketBuyHeader } from './MarketBuyHeader'
import { PlayCardHeader } from './PlayCardHeader'
import { SetupDraftHeader } from './SetupDraftHeader'
import { CitiesConstructionHeader } from './CitiesConstructionHeader'
import { SetupBuildHeader } from './SetupBuildHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SetupDraft]: SetupDraftHeader,
  [RuleId.SetupBuild]:SetupBuildHeader,
  [RuleId.PlayCard]: PlayCardHeader,
  [RuleId.MarketBuy]: MarketBuyHeader,
  [RuleId.CitiesConstruction]:CitiesConstructionHeader
}
