import { getEnumValues } from '@gamepark/rules-api'

export enum Season {
  Spring = 1, Summer, Autumn, Winter
}

export const seasons = getEnumValues(Season)
