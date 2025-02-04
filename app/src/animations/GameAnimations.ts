import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when()
  .move((move) => isMoveItemType(MaterialType.NobleToken)(move))
  .duration(3)