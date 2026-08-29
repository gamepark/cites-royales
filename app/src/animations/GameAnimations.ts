import { and, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure(and(isRule(RuleId.PurpleMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)

gameAnimations
  .configure(and(isRule(RuleId.YellowMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)

gameAnimations
  .configure(and(isRule(RuleId.PinkMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)

gameAnimations
  .configure(and(isRule(RuleId.RedMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)

gameAnimations
  .configure(and(isRule(RuleId.BlueMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)

gameAnimations
  .configure(and(isRule(RuleId.GreenMajority), (move) => isMoveItemType(MaterialType.NobleToken)(move)))
  .duration(2000)