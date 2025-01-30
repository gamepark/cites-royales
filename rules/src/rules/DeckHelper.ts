import { MaterialRulesPart } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'

export class DeckHelper extends MaterialRulesPart {
  renewDeck() {
    const cards = this.material(MaterialType.SubjectCard).location(l => l.type === LocationType.Discard || l.type === LocationType.Reserve)
    return [
      cards.moveItemsAtOnce({ type: LocationType.DrawPile, x: 0 }),
      cards.shuffle()
    ]
  }
}