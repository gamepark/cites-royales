import { FC } from 'react'
import { MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { css } from '@emotion/react'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export const TokenHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerName = usePlayerName(item.id)

  return (
    <>
      <h2 css={titleCss}><Trans defaults={'description.token.title'} values={{type:item.location!.type, player:playerName}}/></h2>
      {item.location!.type === LocationType.VictoryPointsSpace && <p><Trans defaults={'description.token.points'} values={{player:playerName, points:item.location!.x}}/></p>}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`