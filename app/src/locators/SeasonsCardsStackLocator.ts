import { ListLocator } from "@gamepark/react-game";
import { seasonCardDescription } from "../material/SeasonCardDescription";

class SeasonsCardsStackLocator extends ListLocator {
  coordinates = { x: -42, y: -23 };
  gap = { x: seasonCardDescription.width + 0.5 };
}

export const seasonsCardsStackLocator = new SeasonsCardsStackLocator();
