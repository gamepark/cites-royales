import { Trans, useTranslation } from 'react-i18next'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'

export const CitiesConstructionHeader = () => {
  const { t } = useTranslation()
  const me = usePlayerId<NobleColor>()
  const rules = useRules<CitesRoyalesRules>()!
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  if(me !== undefined && rules.isTurnToPlay(me)){
    return (
      <Trans
        defaults="header.build.you"
        components={{
          pass: <PlayMoveButton move={pass}/>
        }}
      />
    )
  } else {
    const activePlayers = rules.game.rule!.players!
    if(activePlayers.length > 1){
      return <>{t('header.setup-draft.players')}</>
    } else {
      return <CitiesConstructionPlayer player={activePlayers[0]}/>
    }
  }
}

const CitiesConstructionPlayer = ({ player }: { player: NobleColor }) => {
  const { t } = useTranslation()
  const playerName = usePlayerName(player)
  return <>{t('header.build.player', { player: playerName })}</>
}