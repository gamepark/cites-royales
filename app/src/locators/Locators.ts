import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { Locator } from '@gamepark/react-game'
import { seasonsCardsStackLocator } from './SeasonsCardsStackLocator'

export const Locators: Partial<Record<LocationType, Locator<NobleColor, MaterialType, LocationType>>> = {
  [LocationType.SeasonsCardsStack]: seasonsCardsStackLocator
}
