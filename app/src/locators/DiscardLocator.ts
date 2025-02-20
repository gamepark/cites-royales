import { Locator } from '@gamepark/react-game'
import { subjectCardDescription } from '../material/SubjectCardDescription'

export class DiscardLocator extends Locator {
  coordinates = { x: -44 + subjectCardDescription.width + 1, y: 5.5 }
  navigationSorts = []
}

export const discardLocator = new DiscardLocator()
