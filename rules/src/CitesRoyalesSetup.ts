import { MaterialGameSetup } from '@gamepark/rules-api'
import { CitesRoyalesOptions } from './CitesRoyalesOptions'
import { CitesRoyalesRules } from './CitesRoyalesRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { seasons } from './material/Season'
import { NobleColor } from './NobleColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class CitesRoyalesSetup extends MaterialGameSetup<NobleColor, MaterialType, LocationType, CitesRoyalesOptions> {
  Rules = CitesRoyalesRules

  setupMaterial() {
    this.setupSeasonCards()
  }

  setupSeasonCards() {
    const gameSeasons = this.players.length === 4 ? seasons.slice(0, 3) : seasons
    this.material(MaterialType.SeasonCard).createItems(gameSeasons.map(season => ({
      id: season,
      location: { type: LocationType.SeasonsCardsStack }
    })))
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}