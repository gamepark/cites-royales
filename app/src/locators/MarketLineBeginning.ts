import { ListLocator } from "@gamepark/react-game";
import { subjectCardDescription } from "../material/SubjectCardDescription";

class MarketLineBeginningLocator extends ListLocator {
  coordinates = { x: -12, y: -23 };
  gap = { y: subjectCardDescription.height + 0.5 };
}

export const marketLineBeginningLocator = new MarketLineBeginningLocator();
