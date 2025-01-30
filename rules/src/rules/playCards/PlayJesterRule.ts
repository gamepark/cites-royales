import { isMoveItemType, isShuffle, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { DeckHelper } from '../DeckHelper'
import { CardEffectRule } from './CardEffectRule'

export class PlayJesterRule extends CardEffectRule {
  onRuleStart() {
    return [
      this.deck.dealOne({ type: LocationType.PlayerHand, player: this.player }),
      this.nextRule
    ]
  }

  get deck() {
    return this.material(MaterialType.SubjectCard).location(LocationType.DrawPile).deck()
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.SubjectCard)(move) && this.deck.length === 0) {
      return new DeckHelper(this.game).renewDeck()
    } else if (isShuffle(move)) {
      return new DeckHelper(this.game).dealReserve()
    }
    return []
  }
}
