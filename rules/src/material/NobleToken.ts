import { getEnumValues } from '@gamepark/rules-api'

export enum NobleToken {
  Brown = 1,
  Cyan,
  Black,
  Beige,
}

export const nobleTokens = getEnumValues(NobleToken)
