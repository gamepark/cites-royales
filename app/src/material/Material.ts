import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { victoryPointsTrackDescription } from './VictoryPointsTrackDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.VictoryPointsTrack]: victoryPointsTrackDescription
}
