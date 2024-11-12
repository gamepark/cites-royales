import { LocationType } from "@gamepark/cites-royales/material/LocationType";
import { MaterialType } from "@gamepark/cites-royales/material/MaterialType";
import { NobleColor } from "@gamepark/cites-royales/NobleColor";
import { Locator } from "@gamepark/react-game";
import { drawPileLocator } from "./DrawPileLocator";
import { marketLocator } from "./Market";
import { reserveLocator } from "./Reserve";
import { seasonsCardsStackLocator } from "./SeasonsCardsStackLocator";
import { victoryPointsTrackSpotLocator } from "./VictoryPointsTrackSpotLocator";

export const Locators: Partial<Record<LocationType, Locator<NobleColor, MaterialType, LocationType>>> = {
  [LocationType.VictoryPointsTrackSpot]: victoryPointsTrackSpotLocator,
  [LocationType.SeasonsCardsStack]: seasonsCardsStackLocator,
  [LocationType.DrawPile]: drawPileLocator,
  [LocationType.Reserve]: reserveLocator,
  [LocationType.Market]: marketLocator,
};
