import { ListLocator } from "@gamepark/react-game";
import { subjectCardDescription } from "../material/SubjectCardDescription";

class ReserveLocator extends ListLocator {
  coordinates = { x: -5, y: -23 };
  gap = { x: subjectCardDescription.width + 0.5 };
}

export const reserveLocator = new ReserveLocator();
