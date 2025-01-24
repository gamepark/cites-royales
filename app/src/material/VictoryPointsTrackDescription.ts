import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import VictoryPointsTrack3 from '../images/boards/VictoryPointsTrack3.jpg'
import VictoryPointsTrack4 from '../images/boards/VictoryPointsTrack4.jpg'

class VictoryPointsTrackDescription extends BoardDescription {
  // TODO : Aggrandir le pointsTrack
  width = 16.59
  height = 11.5

  images = {
    3: VictoryPointsTrack3,
    4: VictoryPointsTrack4,
  }

  getStaticItems(context: MaterialContext) {
    return [
      {
        id: context.rules.players.length === 4 ? 4 : 3,
        location: { type: LocationType.VictoryPointsTrackSpot },
      },
    ]
  }
}

export const victoryPointsTrackDescription = new VictoryPointsTrackDescription()
