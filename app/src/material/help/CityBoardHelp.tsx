import { FC } from 'react'
import { MaterialComponent, MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { cities } from '@gamepark/cites-royales/material/City'
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'

export const CityBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerName = usePlayerName(item.id)

  return (
    <>
      <h2><Trans defaults={'description.city-board.title'} values={{player:playerName}} css={titleCss}/></h2>

      <MaterialComponent type={MaterialType.CityBoard} itemId={NobleColor.Beige} css={boardCss}/>
      {cities.map(city => {
        return city !== undefined && <p key={city}><Trans defaults={'description.city-board.'+city}><strong/></Trans></p>
      })}
    </>
  )
}

const titleCss = css`
    margin-bottom: 1em !important;
`
const boardCss = css`
    font-size: 0.56em;
    position: static !important;
    margin-bottom:4em;
`