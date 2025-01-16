import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'

export class EndGameRule extends PlayerTurnRule {
  onRuleStart() {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      const playerHeroCardAvailable = this.material(MaterialType.HeroCard).player(player).rotation(true).length > 0
      if(playerHeroCardAvailable) {
        moves.push(...this.material(MaterialType.NobleToken)
          .id(id => id === player)
          .moveItems((item) => ({
            type: LocationType.VictoryPointsSpace,
            x: item.location.x! + 2
          })))
      }
    }
    moves.push(this.endGame())
    return moves
  }
}