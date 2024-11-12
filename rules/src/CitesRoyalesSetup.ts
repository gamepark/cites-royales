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
    this.setupSubjectCards()
    this.setupReserve()
  }

  setupSeasonCards() {
    const gameSeasons = this.players.length === 4 ? seasons.slice(0, 3) : seasons
    this.material(MaterialType.SeasonCard).createItems(gameSeasons.map(season => ({
      id: season,
      location: { type: LocationType.SeasonsCardsStack }
    })))
  }

  setupSubjectCards() {
    this.material(MaterialType.SubjectCard).createItems([]) // TODO
    this.material(MaterialType.SubjectCard).shuffle()
  }

  setupReserve() {
    this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck().deal({ type: LocationType.Reserve }, 4)
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}