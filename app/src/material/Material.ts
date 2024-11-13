import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { marketHalfSizedCardDescription } from './MarketHalfSizedCardDescription'
import { seasonCardDescription } from './SeasonCardDescription'
import { subjectCardDescription } from './SubjectCardDescription'
import { victoryPointsTrackDescription } from './VictoryPointsTrackDescription'
import { nobleTokenDescription } from './nobleTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.VictoryPointsTrack]: victoryPointsTrackDescription,
  [MaterialType.SeasonCard]: seasonCardDescription,
  [MaterialType.SubjectCard]: subjectCardDescription,
  [MaterialType.MarketHalfSizedCard]: marketHalfSizedCardDescription,
  [MaterialType.NobleToken]: nobleTokenDescription,
}
