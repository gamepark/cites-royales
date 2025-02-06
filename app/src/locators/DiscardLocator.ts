import { Locator } from '@gamepark/react-game'
import { subjectCardDescription } from '../material/SubjectCardDescription'

// TODO : Défausse pas visible liste : Demander à Romain
export class DiscardLocator extends Locator {
  coordinates = { x: -44 + subjectCardDescription.width + 1, y: 5.5 }
}

export const discardLocator = new DiscardLocator()
