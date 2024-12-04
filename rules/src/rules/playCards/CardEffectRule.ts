import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { RuleId } from '../RuleId'
import { Memory } from '../Memory'

export abstract class CardEffectRule extends PlayerTurnRule {
  onRuleStart(): MaterialMove[] {
    if (this.getPlayerMoves().length === 0) {
      return [this.nextRule]
    }
    return []
  }

  get nextRule(){
    if(this.remind(Memory.Revolution)){
      return this.startPlayerTurn(RuleId.PlayCard, this.nextPlayer)
    } else {
      return this.startRule(RuleId.MarketBuy)
    }
  }
}
