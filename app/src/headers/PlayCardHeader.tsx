import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const PlayCardHeader = () => {
  const { t } = useTranslation()
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const activePlayer = rules.getActivePlayer()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  const player = usePlayerName(activePlayer)
  if (me === activePlayer) {
    return <Trans defaults="header.play-card.you" components={{
      pass: <PlayMoveButton move={pass}/>
    }}/>
  }
  return <>{t('header.play-card.player', { player })}</>
}