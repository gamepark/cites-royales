import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import {
  PlayMoveButton,
  UndoMovesButton,
  useLegalMove,
  usePlayerId,
  usePlayerName,
  useRules
} from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans} from 'react-i18next'
import { MarketBuyRule } from '@gamepark/cites-royales/rules/MarketBuyRule'

export const MarketBuyHeader = () => {
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const rule = new MarketBuyRule(rules.game)
  const purchasingPower = rule.getPurchasingPower()
  const playerCanBuy = rule.cardsPlayerCanBuy
  const activePlayer = rules.getActivePlayer()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const player = usePlayerName(activePlayer)
  if (me === activePlayer) {
    if(playerCanBuy){
      return (
        <Trans
          defaults="header.market-buy.you"
          values={{value:purchasingPower}}
          components={{
            pass: <PlayMoveButton move={pass} />
          }}
        />
      )
    } else {
      return (
        <Trans
        defaults="header.market-buy.validate"
        components={{
          validate: <PlayMoveButton move={pass} />,
          undo: <UndoMovesButton moves={1} />
        }}
        />
      )
    }
  }
  return <Trans
    defaults="header.market-buy.player"
    values={{player, value: purchasingPower}}
  />
}
