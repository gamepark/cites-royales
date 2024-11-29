import { getEnumValues } from '@gamepark/rules-api'

export enum City {
  Purple = 1,
  Yellow,
  Pink,
  Red,
  Blue,
  Green,
}

export const cities = getEnumValues(City)
