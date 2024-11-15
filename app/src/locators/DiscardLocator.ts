import { ListLocator } from '@gamepark/react-game'
import { subjectCardDescription } from '../material/SubjectCardDescription'

export class DiscardLocator extends ListLocator {
  coordinates = { x: -44 + subjectCardDescription.width + 1 }
}

export const discardLocator = new DiscardLocator()
