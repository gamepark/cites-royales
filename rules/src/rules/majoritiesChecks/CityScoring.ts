import { Material, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { City } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectType } from '../../material/Subject'
import { NobleColor } from '../../NobleColor'

export abstract class CityScoring extends PlayerTurnRule {
  abstract city: City

  // TODO : Pas le même scoring visuellement entre joueurs
  onRuleStart() {
    const moves: MaterialMove[] = []
    const winners = this.getMajorityWinners()

    for (const winner of winners) {
      const playerVictoryPoints = this.getPlayerVictoryPoints(winner)
      moves.push(this.material(MaterialType.NobleToken)
        .id(winner)
        .moveItem((item) => ({
          type: LocationType.VictoryPointsSpace,
          x: item.location.x! + playerVictoryPoints
        })))

    }

    moves.push(this.goToNextRule())

    return moves
  }

  abstract getPlayerVictoryPoints(player: NobleColor): number

  abstract goToNextRule(): MaterialMove

  getMajorityWinners() {
    const players = this.game.players

    const playersInfluence = players.map(player => ({
      player,
      influence: this.getCityInfluence(
        this.material(MaterialType.SubjectCard)
          .location(LocationType.InCity)
          .player(player).filter(card => card.location.id === this.city)
      )
    }))

    const maxInfluence = Math.max(...playersInfluence.map(p => p.influence))

    return maxInfluence === 0 ? [] : playersInfluence
      .filter(p => p.influence === maxInfluence)
      .map(p => p.player)
  }

  getCityInfluence(cityCards: Material) {
    return cityCards
      .getItems()
      .reduce((influence: number, card) => influence + getSubjectType(card.id), 0)
  }

}