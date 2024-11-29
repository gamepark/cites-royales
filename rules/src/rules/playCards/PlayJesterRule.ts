import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { RuleId } from '../RuleId'
import { CardEffectRule } from './CardEffectRule'

export class PlayJesterRule extends CardEffectRule {
  onRuleStart() {
    return [
      this.material(MaterialType.SubjectCard)
        .location(LocationType.DrawPile)
        .deck()
        .dealOne({ type: LocationType.PlayerHand, player: this.player }),
      this.startRule(RuleId.MarketBuy)
    ]
  }
}
