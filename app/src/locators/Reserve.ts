import { ListLocator } from "@gamepark/react-game";
import { subjectCardDescription } from "../material/SubjectCardDescription";

class ReserveLocator extends ListLocator {
  coordinates = { y: 10 };
  gap = { x: subjectCardDescription.width };
}

export const reserveLocator = new ReserveLocator();
