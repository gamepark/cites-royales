import { CustomMove, Material, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType, Subject } from '../../material/Subject'
import { City } from '../../material/City'
import { NobleColor } from '../../NobleColor'
import { CustomMoveType } from '../CustomMoveType'


export abstract class CityScoring extends PlayerTurnRule {
  abstract getPlayerVictoryPoints(player:NobleColor):number

  abstract goToNextRule():any // TODO : Changer any

  hasMajority(city: City) {
    const players = this.game.players;

    const playersInfluence = players.map(player => ({
      player,
      influence: this.getCityInfluence(
        this.material(MaterialType.SubjectCard)
          .location(LocationType.InCity)
          .player(player)
          .id<Subject>(id => getSubjectCity(id) === city)
      )
    }));

    const maxInfluence = Math.max(...playersInfluence.map(p => p.influence));

    const winners = playersInfluence
      .filter(p => p.influence === maxInfluence)
      .map(p => p.player);

    return { city, influence: maxInfluence, winners };
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