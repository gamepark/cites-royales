import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor } from '../material/Subject'

export class PlayerTurn extends PlayerTurnRule {
  onRuleStart() {
    return this.game.players.flatMap((player) => {
      return this.material(MaterialType.SubjectCard)
        .location(LocationType.PlayerArea)
        .player(player)
        .moveItems((item) => ({ type: LocationType.InCity, player, id: getSubjectColor(item.id) }))
    })
  }
  getLegalMoves(_player: number) {
    return []
  }
}
