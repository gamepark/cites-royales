import { BoardDescription } from '@gamepark/react-game'
import VictoryPointsTrack3 from '../images/boards/VictoryPointsTrack3.jpg'
import VictoryPointsTrack4 from '../images/boards/VictoryPointsTrack4.jpg'

class VictoryPointsTrackDescription extends BoardDescription {
  width = 16.59
  height = 11.5

  images = {
    [3]: VictoryPointsTrack3,
    [4]: VictoryPointsTrack4
  }
}

export const victoryPointsTrackDescription = new VictoryPointsTrackDescription()