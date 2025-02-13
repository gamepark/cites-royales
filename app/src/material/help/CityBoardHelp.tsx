import { FC } from 'react'
import { MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { cities } from '@gamepark/cites-royales/material/City'
import { css } from '@emotion/react'

export const CityBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerName = usePlayerName(item.id)

  return (
    <>
      <h2 css={titleCss}><Trans defaults={'description.city-board.title'} values={{player:playerName}}/></h2>
      {cities.map(city => {
        return city !== undefined && <p><Trans key={city} defaults={'description.city-board.'+city}><strong/></Trans></p>
      })}
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`