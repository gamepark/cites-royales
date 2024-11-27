import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule, PlayMoveContext } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { getSubjectColor, getSubjectType, isWhite, subjectColors } from '../material/Subject'
import { CustomMoveType } from './CustomMoveType'
import { RuleId } from './RuleId'

export class PlayAstrologerRule extends PlayerTurnRule {
  onRuleStart() {
    const dealCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.ActionHand, player: this.player }, 3)

    return dealCards
  }
  getLegalMoves(player: number) {
    const moves: MaterialMove[] = []
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)
    const inCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    subjectColors.forEach((color) => {
      if (color === 0) return

      console.log(
        playerHand
          .filter((item) => isWhite(item.id))
          .filter((item) => {
            const subjectType = getSubjectType(item.id)
            const subjectColor = getSubjectColor(item.id)

            return inCity
              .filter((item) => getSubjectColor(item.id) === subjectColor)
              .getItems()
              .every((item) => getSubjectType(item.id) < subjectType)
          })
      )
      moves.push(
        ...playerHand
          .filter((item) => isWhite(item.id))
          .filter((item) => {
            const subjectType = getSubjectType(item.id)
            const subjectColor = getSubjectColor(item.id)

            const inCityColor = inCity.filter((item) => getSubjectColor(item.id) === subjectColor)

            if (inCityColor.length > 0)
              return inCityColor.getItems().every((item) => getSubjectType(item.id) < subjectType)

            return false
          })
          .moveItems({ type: LocationType.InCity, player, id: color })
      )
    })
    moves.push(
      ...playerHand
        .filter((item) => !isWhite(item.id))
        .filter((item) => {
          const subjectType = getSubjectType(item.id)
          const subjectColor = getSubjectColor(item.id)

          return inCity
            .filter((item) => getSubjectColor(item.id) === subjectColor)
            .getItems()
            .every((item) => getSubjectType(item.id) < subjectType)
        })
        .moveItems((item) => ({ type: LocationType.InCity, player, id: getSubjectColor(item.id) }))
    )

    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }
  afterItemMove(move: ItemMove, _context?: PlayMoveContext) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return moves

    const remainingCards = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)

    if (remainingCards.length === 1) {
      moves.push(this.material(MaterialType.SubjectCard).moveItem({ type: LocationType.Discard }))

      moves.push(this.startRule(RuleId.MarketBuy))
    }

    return moves
  }
}
