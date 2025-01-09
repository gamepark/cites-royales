import { CustomMove, Material, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { City } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType, Subject } from '../../material/Subject'
import { NobleColor } from '../../NobleColor'
import { CustomMoveType } from '../CustomMoveType'

export abstract class CityScoring extends PlayerTurnRule {
  abstract city: City

  onRuleStart() {
    const moves:MaterialMove[] = []
    const winners = this.getMajorityWinners()

    for(const winner of winners){
      const playerVictoryPoints = this.getPlayerVictoryPoints(winner)
      moves.push(this.customMove(CustomMoveType.Score, {points:playerVictoryPoints, player:winner}))
    }

    moves.push(this.goToNextRule())

    return moves
  }

  abstract getPlayerVictoryPoints(player:NobleColor):number

  abstract goToNextRule(): MaterialMove

  getMajorityWinners() {
    const players = this.game.players;

    const playersInfluence = players.map(player => ({
      player,
      influence: this.getCityInfluence(
        this.material(MaterialType.SubjectCard)
          .location(LocationType.InCity)
          .player(player)
          .id<Subject>(id => getSubjectCity(id) === this.city)
      )
    }));

    const maxInfluence = Math.max(...playersInfluence.map(p => p.influence));

    return playersInfluence
      .filter(p => p.influence === maxInfluence)
      .map(p => p.player)
  }

  onCustomMove(move: CustomMove, _context?: PlayMoveContext) {
    const moves:MaterialMove[] = []
    if(move.type === CustomMoveType.Score) {
      moves.push(...this.addVictoryPoints(move.data.points, move.data.player))
    }

    return moves
  }

  addVictoryPoints(points:number, player:NobleColor) {
  return this.material(MaterialType.NobleToken)
      .id(id => id === player)
      .moveItems((item) => ({
        type: LocationType.VictoryPointsSpace,
        x: item.location.x! + points
      }))
  }

  getCityInfluence(cityCards: Material) {
    return cityCards
      .getItems()
      .reduce((influence: number, card) => influence + getSubjectType(card.id), 0);
  }

}