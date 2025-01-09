import { Trans } from 'react-i18next'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { CustomMoveType } from '@gamepark/cites-royales/rules/CustomMoveType'

export const CitiesConstructionHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <Trans
      defaults="header.build.you"
      components={{
        pass: <PlayMoveButton move={pass}/>
      }}
    />
  )
}