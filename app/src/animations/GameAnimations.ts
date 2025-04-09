import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { RuleId } from '@gamepark/cites-royales/rules/RuleId'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when()
  .rule(RuleId.PurpleMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)

gameAnimations.when()
  .rule(RuleId.YellowMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)

gameAnimations.when()
  .rule(RuleId.PinkMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)

gameAnimations.when()
  .rule(RuleId.RedMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)

gameAnimations.when()
  .rule(RuleId.BlueMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)

gameAnimations.when()
  .rule(RuleId.GreenMajority)
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(2)