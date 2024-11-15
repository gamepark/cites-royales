import { FlexLocator } from '@gamepark/react-game'
import { subjectCardDescription } from '../material/SubjectCardDescription'

class MarketLocator extends FlexLocator {
  coordinates = { x: -7, y: -23 + subjectCardDescription.height + 0.5, z: 0 }
  gap = { x: subjectCardDescription.width + 0.5, y: 0 }

  lineSize = 4
  lineGap = { x: 0, y: subjectCardDescription.height + 0.5 }
}

export const marketLocator = new MarketLocator()
