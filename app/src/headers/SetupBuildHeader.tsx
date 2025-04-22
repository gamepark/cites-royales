import { useTranslation } from 'react-i18next'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'

export const SetupBuildHeader = () => {
  const { t } = useTranslation()
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!

  console.log(me)
  if(me !== undefined && rules.isTurnToPlay(me)) {
    return <>{t('header.setup-build.you')}</>
  } else {
    const activePlayers = rules.game.rule!.players!
    if (activePlayers.length > 1) {
      return <>{t('header.setup-build.players')}</>
    } else if(!activePlayers.length) {
      return null
    } else {
      return <SetupBuildHeaderPlayer player={activePlayers[0]}/>
    }
  }
}

const SetupBuildHeaderPlayer = ({ player }: { player: NobleColor }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <>{t('header.setup-build.player', { player: playerName })}</>
}
