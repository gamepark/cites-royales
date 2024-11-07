import { getEnumValues } from '@gamepark/rules-api'

export enum NobleColor {
  Brown = 1, Cyan, Black, Beige
}

export const playerColors = getEnumValues(NobleColor)
