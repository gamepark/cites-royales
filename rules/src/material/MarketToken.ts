import { getEnumValues } from '@gamepark/rules-api'

export enum MarketToken {
  Brown = 1,
  Cyan,
  Black,
  Beige,
}

export const marketTokens = getEnumValues(MarketToken)
