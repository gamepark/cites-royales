/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { cities } from '@gamepark/cites-royales/material/City'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { MaterialComponent, MaterialHelpProps, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const CityBoardHelp: FC<MaterialHelpProps> = (props) => {
  const { item } = props
  const playerName = usePlayerName(item.id)

  return (
    <>
      <h2><Trans defaults={'description.city-board.title'} values={{player:playerName}}/></h2>

      <MaterialComponent type={MaterialType.CityBoard} itemId={item.id} css={boardCss}/>
      {cities.map(city => {
        return city !== undefined && <p key={city}><Trans defaults={'description.city-board.'+city}><strong/></Trans></p>
      })}
    </>
  )
}

const boardCss = css`
    font-size: 1.25em;
    margin: 1em auto;
`