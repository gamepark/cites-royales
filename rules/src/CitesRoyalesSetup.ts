import { MaterialGameSetup } from '@gamepark/rules-api'
import { CitesRoyalesOptions } from './CitesRoyalesOptions'
import { CitesRoyalesRules } from './CitesRoyalesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { NobleColor } from './NobleColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class CitesRoyalesSetup extends MaterialGameSetup<NobleColor, MaterialType, LocationType, CitesRoyalesOptions> {
  Rules = CitesRoyalesRules

  setupMaterial() {
    this.material(MaterialType.VictoryPointsTrack).createItem({
      id: this.players.length === 4 ? 4 : 3,
      location: { type: LocationType.VictoryPointsTrackSpot }
    })
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}