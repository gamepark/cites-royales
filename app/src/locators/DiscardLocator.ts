import { PileLocator } from '@gamepark/react-game'
import { subjectCardDescription } from '../material/SubjectCardDescription'

export class DiscardLocator extends PileLocator {
  coordinates = { x: -44 + subjectCardDescription.width + 1, y: 5.5 }
  navigationSorts = []
  maxAngle = 10
}

export const discardLocator = new DiscardLocator()
