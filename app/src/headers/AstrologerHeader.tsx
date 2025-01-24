import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'

export const AstrologerHeader = () => {
  const { t } = useTranslation()

  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const activePlayer = rules.game.rule!.player
  const playerName = usePlayerName(activePlayer)
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if(me !== undefined && rules.isTurnToPlay(me)) {
    return <Trans
      defaults={'header.astrologer.you'}
      components={{
        pass: <PlayMoveButton move={pass}/>
    }}
    />
  } else {
    return <>{t('header.astrologer.player', {player: playerName})}</>
  }
}