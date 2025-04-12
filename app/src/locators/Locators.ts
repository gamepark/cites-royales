import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { Locator } from '@gamepark/react-game'
import { actionHandLocator } from './ActionHandLocator'
import { cityBoardSpotLocator } from './CityBoardSpotLocator'
import { discardLocator } from './DiscardLocator'
import { drawPileLocator } from './DrawPileLocator'
import { heroSpotLocator } from './HeroSpotLocator'
import { inCityLocator } from './InCityLocator'
import { marketLocator } from './Market'
import { marketLineBeginningLocator } from './MarketLineBeginning'
import { marketTokenSpotLocator } from './MarketTokenSpotLocator'
import { onSeasonCardsLocator } from './OnSeasonCardsLocator'
import { playerAreaLocator } from './PlayerAreaLocator'
import { playerHandLocator } from './PlayerHandLocator'
import { reserveLocator } from './Reserve'
import { seasonsCardsStackLocator } from './SeasonsCardsStackLocator'
import { victoryPointsSpaceLocator } from './VictoryPointsSpaceLocator'
import { victoryPointsTrackSpotLocator } from './VictoryPointsTrackSpotLocator'
import { cityBoardCountSpotLocator } from './CityBoardCountSpotLocator'

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
  [LocationType.CityBoardSpot]: cityBoardSpotLocator,
  [LocationType.HeroSpot]: heroSpotLocator,
  [LocationType.PlayerHand]: playerHandLocator,
  [LocationType.PlayerArea]: playerAreaLocator,
  [LocationType.ActionHand]: actionHandLocator,
  [LocationType.InCity]: inCityLocator,
  [LocationType.OnSeasonCards]: onSeasonCardsLocator,
  [LocationType.CityBoardCountSpot]: cityBoardCountSpotLocator,
}
