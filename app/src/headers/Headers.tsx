/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'
import { ComponentType } from 'react'
import { SetupDraftHeader } from './SetupDraftHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.SetupDraft]: SetupDraftHeader,
}
