import { useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'

export const MerchantHeader = () => {
  const { t } = useTranslation()

  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const activePlayer = rules.game.rule!.player
  const playerName = usePlayerName(activePlayer)
  if(me !== undefined && rules.isTurnToPlay(me)) {
    return <>{t('header.merchant.you')}</>
  } else {
    return <>{t('header.merchant.player', {player: playerName})}</>
  }
}