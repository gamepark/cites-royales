import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { Locator } from '@gamepark/react-game'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'
import { discardLocator } from './DiscardLocator'
import { drawPileLocator } from './DrawPileLocator'
import { helpCardSpotLocator } from './HelpCardSpotLocator'
import { marketLocator } from './Market'
import { marketLineBeginningLocator } from './MarketLineBeginning'
import { marketTokenSpotLocator } from './MarketTokenSpotLocator'
import { reserveLocator } from './Reserve'
import { seasonsCardsStackLocator } from './SeasonsCardsStackLocator'
import { victoryPointsSpaceLocator } from './VictoryPointsSpaceLocator'
import { victoryPointsTrackSpotLocator } from './VictoryPointsTrackSpotLocator'

export const Locators: Partial<Record<LocationType, Locator<NobleColor, MaterialType, LocationType>>> = {
  [LocationType.VictoryPointsTrackSpot]: victoryPointsTrackSpotLocator,
  [LocationType.SeasonsCardsStack]: seasonsCardsStackLocator,
  [LocationType.DrawPile]: drawPileLocator,
  [LocationType.Discard]: discardLocator,
  [LocationType.Reserve]: reserveLocator,
  [LocationType.Market]: marketLocator,
  [LocationType.MarketLineBeginning]: marketLineBeginningLocator,
  [LocationType.VictoryPointsSpace]: victoryPointsSpaceLocator,
  [LocationType.MarketTokenSpot]: marketTokenSpotLocator,
  [LocationType.HelpCardSpot]: helpCardSpotLocator,
  [LocationType.CityBoardSpot]: cityBoardSpotLocator,
}
