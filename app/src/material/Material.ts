import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { cityBoardDescription } from './CityBoardDescription'
import { heroCardDescription } from './HeroCardDescription'
import { marketHalfSizedCardDescription } from './MarketHalfSizedCardDescription'
import { marketTokenDescription } from './MarketTokenDescription'
import { nobleTokenDescription } from './NobleTokenDescription'
import { seasonCardDescription } from './SeasonCardDescription'
import { subjectCardDescription } from './SubjectCardDescription'
import { victoryPointsTrackDescription } from './VictoryPointsTrackDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.VictoryPointsTrack]: victoryPointsTrackDescription,
  [MaterialType.SeasonCard]: seasonCardDescription,
  [MaterialType.SubjectCard]: subjectCardDescription,
  [MaterialType.MarketHalfSizedCard]: marketHalfSizedCardDescription,
  [MaterialType.NobleToken]: nobleTokenDescription,
  [MaterialType.MarketToken]: marketTokenDescription,
  [MaterialType.CityBoard]: cityBoardDescription,
  [MaterialType.HeroCard]: heroCardDescription,
}
