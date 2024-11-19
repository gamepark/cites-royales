import { MaterialGameSetup } from '@gamepark/rules-api'
import { uniq } from 'lodash'
import { CitesRoyalesOptions } from './CitesRoyalesOptions'
import { CitesRoyalesRules } from './CitesRoyalesRules'
import { LocationType } from './material/LocationType'
import { marketHalfSizedCards } from './material/MarketHalfSizedCard'
import { MaterialType } from './material/MaterialType'
import { seasons } from './material/Season'
import { getSubjectColor, subjects } from './material/Subject'
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
    this.setupMarket()
    this.setupMarketBeginning()
    this.setupPlayers()
  }

  setupSeasonCards() {
    const gameSeasons = this.players.length === 4 ? seasons.slice(0, 3) : seasons
    this.material(MaterialType.SeasonCard).createItems(
      gameSeasons.map((season) => ({
        id: season,
        location: { type: LocationType.SeasonsCardsStack },
      }))
    )
  }

  setupSubjectCards() {
    this.material(MaterialType.SubjectCard).createItems(
      subjects.map((subject) => ({
        id: subject,
        location: { type: LocationType.DrawPile },
      }))
    )
    this.material(MaterialType.SubjectCard).shuffle()
  }

  setupReserve() {
    this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.Reserve }, 4)
  }

  setupMarket() {
    this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.Market }, 4)
    while (!this.marketHasFourDifferentColorCards()) {
      const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market)

      const marketCardsItems = marketCards.getItems()

      const cardsToDiscard = marketCards.filter((item) =>
        marketCardsItems.every(
          (item2) => item2.location.x! >= item.location.x! || getSubjectColor(item2.id) !== getSubjectColor(item.id)
        )
      )
      cardsToDiscard.moveItems({ type: LocationType.Discard })
      this.material(MaterialType.SubjectCard)
        .location(LocationType.DrawPile)
        .deck()
        .deal({ type: LocationType.Market }, cardsToDiscard.length)
    }
  }

  marketHasFourDifferentColorCards() {
    const marketCards = this.material(MaterialType.SubjectCard).location(LocationType.Market).getItems()

    const colors = marketCards.map((card) => getSubjectColor(card.id))

    return uniq(colors).length === 4
  }

  setupMarketBeginning() {
    this.material(MaterialType.MarketHalfSizedCard).createItems(
      marketHalfSizedCards.map((card) => ({
        id: card,
        location: { type: LocationType.MarketLineBeginning },
      }))
    )
  }

  setupPlayers() {
    for (const player of this.players) {
      this.setupPlayer(player)
    }
  }

  setupPlayer(player: NobleColor) {
    this.material(MaterialType.NobleToken).createItem({
      id: player,
      location: { type: LocationType.VictoryPointsSpace, x: 0 },
    })
    this.material(MaterialType.MarketToken).createItem({ id: player, location: { type: LocationType.MarketTokenSpot } })
    this.material(MaterialType.CityBoard).createItem({
      id: player,
      location: { type: LocationType.CityBoardSpot, player: player },
    })
    this.material(MaterialType.HeroCard).createItem({
      id: player,
      location: { type: LocationType.HeroSpot, player: player },
    })
  }

  start() {
    this.startSimultaneousRule(RuleId.SetupDraft)
  }
}
