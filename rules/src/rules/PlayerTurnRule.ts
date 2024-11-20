import { PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'

export class PlayerTurn extends PlayerTurnRule {
  onRuleStart<RuleId extends number>(
    _move: RuleMove<number, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ) {
    return []
  }
}
