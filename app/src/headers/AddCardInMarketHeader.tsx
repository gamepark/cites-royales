import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { AddCardInMarketRule } from '@gamepark/cites-royales/rules/AddCardInMarketRule'
import { Trans } from 'react-i18next'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'

export const AddCardInMarketHeader = () => {
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const rule = new AddCardInMarketRule(rules.game)
  const activePlayer = rules.getActivePlayer()
  const player = usePlayerName(activePlayer)
  const playerHeroAvailable = rule.playerHeroAvailable
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const hero = useLegalMove(isCustomMoveType(CustomMoveType.Hero))

  if(me === activePlayer) {
    if(playerHeroAvailable) {
      return (
        <Trans
        defaults={"header.market-draw.you"}
        components={{
          draw: <PlayMoveButton move={pass} />,
          hero: <PlayMoveButton move={hero} />
        }}/>
      )
    } else {

    }
  }
  return (
    <Trans
    defaults={"header.market-draw.player"}
    values={{player}}
    />
  )
}