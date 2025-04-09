import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const TokenHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerName = usePlayerName(item.id)

  return (
    <>
      <h2><Trans defaults={'description.token.title'} values={{ type: item.location!.type, player: playerName }}/></h2>
      {item.location!.type === LocationType.VictoryPointsSpace &&
        <p><Trans defaults={'description.token.points'} values={{ player: playerName, points: item.location!.x }}/></p>}
    </>
  )
}
