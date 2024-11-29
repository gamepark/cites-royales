import { isMoveItemType, ItemMove, SimultaneousRule } from '@gamepark/rules-api'
import { minBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectCity, getSubjectType, isWhite, Subject } from '../material/Subject'
import { NobleColor } from '../NobleColor'
import { RuleId } from './RuleId'

export class SetupBuildRule extends SimultaneousRule {
  onRuleStart() {
    return this.material(MaterialType.SubjectCard)
      .location(LocationType.PlayerArea)
      .moveItems((item) => ({ type: LocationType.PlayerHand, player: item.location.player }))
  }

  getActivePlayerLegalMoves(player: NobleColor) {
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.PlayerHand).player(player)
    return playerHand
      .id<Subject>(subject => !isWhite(subject))
      .moveItems({ type: LocationType.PlayerArea, player })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.PlayerArea) {
      return [this.endPlayerTurn(move.location.player!)]
    }
    return []
  }

  getMovesAfterPlayersDone() {
    const builtCards = this.material(MaterialType.SubjectCard).location(LocationType.PlayerArea)
    if (builtCards.getItems().some(item => item.id === undefined)) return [] // On front-end side, cards id are hidden: wait for server to return the consequences

    const startPlayer = minBy(this.game.players, player => {
      const subject = builtCards.player(player).getItem<Subject>()!.id
      return getSubjectType(subject) * 10 + getSubjectCity(subject)!
    })!

    return [
      ...builtCards.moveItems((item) => ({
        type: LocationType.InCity,
        player: item.location.player,
        id: getSubjectCity(item.id)
      })),
      this.startPlayerTurn(RuleId.PlayCard, startPlayer)
    ]
  }
}
