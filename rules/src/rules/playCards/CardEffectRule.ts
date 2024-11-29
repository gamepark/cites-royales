import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'

export abstract class CardEffectRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.getPlayerMoves().length === 0) {
      return [this.startRule(RuleId.MarketBuy)]
    }
    return []
  }
}
