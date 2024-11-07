import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { PlayerColor } from '@gamepark/cites-royales/PlayerColor'
import { Locator } from '@gamepark/react-game'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {}
