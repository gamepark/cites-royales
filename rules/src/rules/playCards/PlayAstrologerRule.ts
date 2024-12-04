import { CustomMove, isMoveItemType, ItemMove, MaterialMove } from '@gamepark/rules-api'
import { cities } from '../../material/City'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { getSubjectCity, getSubjectType, isWhite } from '../../material/Subject'
import { CustomMoveType } from '../CustomMoveType'
import { CardEffectRule } from './CardEffectRule'

export class PlayAstrologerRule extends CardEffectRule {
  onRuleStart() {
    const dealCards = this.material(MaterialType.SubjectCard)
      .location(LocationType.DrawPile)
      .deck()
      .deal({ type: LocationType.ActionHand, player: this.player }, 3)

    return dealCards
  }
  getPlayerMoves() {
    const player = this.player
    const moves: MaterialMove[] = []
    const playerHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)
    const inCity = this.material(MaterialType.SubjectCard).location(LocationType.InCity).player(player)

    for (const city of cities) {

      moves.push(
        ...playerHand
          .filter((item) => isWhite(item.id))
          .filter((item) => {
            const subjectType = getSubjectType(item.id)
            const subjectColor = getSubjectCity(item.id)

            const inCityColor = inCity.filter((inCity) => getSubjectCity(inCity.id) === subjectColor)

            if (inCityColor.length > 0) {
              return inCityColor.getItems().every((card) => getSubjectType(card.id) < subjectType)
            }

            return false
          })
          .moveItems({
            type: LocationType.InCity,
            player,
            id: city
          })
      )
    }

    moves.push(
      ...playerHand
        .filter((item) => !isWhite(item.id))
        .filter((item) => {
          const subjectType = getSubjectType(item.id)
          const subjectColor = getSubjectCity(item.id)

          return inCity
            .filter((item) => getSubjectCity(item.id) === subjectColor)
            .getItems()
            .every((item) => getSubjectType(item.id) < subjectType)
        })
        .moveItems((item) => ({ type: LocationType.InCity, player, id: getSubjectCity(item.id) }))
    )

    moves.push(this.customMove(CustomMoveType.Pass))

    return moves
  }
  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.Pass) {
      return [
        ...this.material(MaterialType.SubjectCard)
          .location(LocationType.ActionHand)
          .moveItems({ type: LocationType.Discard }),
        this.nextRule
      ]
    }
    return []
  }
  afterItemMove(move: ItemMove) {
    const moves: MaterialMove[] = []
    if (!isMoveItemType(MaterialType.SubjectCard)(move) || move.location.type !== LocationType.InCity) return moves

    const remainingCards = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)

    if (remainingCards.length === 1) {
      moves.push(
        this.material(MaterialType.SubjectCard)
          .location(LocationType.ActionHand)
          .moveItem({ type: LocationType.Discard })
      )

      moves.push(this.nextRule)
    }

    return moves
  }
}
