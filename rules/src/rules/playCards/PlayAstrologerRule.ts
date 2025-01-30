import { CustomMove, isMoveItemType, isShuffle, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { CitiesConstructionRule } from '../CitiesConstructionRule'
import { CustomMoveType } from '../CustomMoveType'
import { DeckHelper } from '../DeckHelper'
import { Memory } from '../Memory'
import { CardEffectRule } from './CardEffectRule'

export class PlayAstrologerRule extends CardEffectRule {
  onRuleStart() {
    for (const player of this.game.players) {

      this.memorize(Memory.CitiesWithColorBuild, [], player)
      this.memorize(Memory.CitiesWithWhiteBuild, [], player)
    }
    const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
    if (deck.length > 3) {
      return deck.deal({ type: LocationType.ActionHand, player: this.player }, 3)
    } else {
      return new DeckHelper(this.game).renewDeck()
    }
  }

  getPlayerMoves() {
    const actionHand = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)
    return new CitiesConstructionRule(this.game).getBuildMoves(this.player, actionHand)
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
    if (isMoveItemType(MaterialType.SubjectCard)(move) && move.location.type === LocationType.InCity) {
      new CitiesConstructionRule(this.game).afterSubjectCardBuild(move)

      const remainingCards = this.material(MaterialType.SubjectCard).location(LocationType.ActionHand)
      if (remainingCards.length === 1) {
        return [
          this.material(MaterialType.SubjectCard)
            .location(LocationType.ActionHand)
            .moveItem({ type: LocationType.Discard }),
          this.nextRule
        ]
      }
    } else if (isShuffle(move)) {
      const deck = this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
      return [
        ...deck.deal({ type: LocationType.ActionHand, player: this.player }, 3),
        ...deck.deal({ type: LocationType.Reserve }, 4)
      ]
    }
    return []
  }

  onRuleEnd() {
    this.forget(Memory.CitiesWithColorBuild)
    this.forget(Memory.CitiesWithWhiteBuild)
    return []
  }
}
