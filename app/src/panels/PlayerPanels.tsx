/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { CounterProps, StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import BlackPanel from '../images/panels/Black.jpg'
import BrownPanel from '../images/panels/Brown.jpg'
import CyanPanel from '../images/panels/Cyan.jpg'
import BeigePanel from '../images/panels/Beige.jpg'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import vpIcon from "../images/panels/Laurier.png"

export const PlayerPanels = () => {
  const players = usePlayers<NobleColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  const rules = useRules()!
  const CitesRules = new CitesRoyalesRules(rules.game)
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => {
        const counters: CounterProps[] = [{
          image: vpIcon,
          value: CitesRules.getScore(player.id),
        }]
        return (
          <StyledPlayerPanel
            key={player.id}
            player={player}
            color={playerColorCode[player.id]}
            css={panelPosition(index, player.id)}
            counters={counters}
          >
          </StyledPlayerPanel>
        )
      })}
    </>,
    root
  )
}
const panelPosition = (index: number, player: NobleColor) => css`
    position: absolute;
    right: 1em;
    top: ${index === 0 ? 90 : 1 + index * 22.5}em;
    width: 28em;
    background-image: ${playerPanel[player]};
    background-size: 185%;
    background-position: 55% 55%;
    border:2px solid white;
`

export const playerColorCode: Record<NobleColor, string> = {
  [NobleColor.Brown]: '#693711',
  [NobleColor.Cyan]: '#057E77',
  [NobleColor.Black]: '#474243',
  [NobleColor.Beige]: '#AC9D67',
}

const playerPanel: Record<NobleColor, string> = {
  [NobleColor.Brown]: `url(${BrownPanel})`,
  [NobleColor.Cyan]: `url(${CyanPanel})`,
  [NobleColor.Black]: `url(${BlackPanel})`,
  [NobleColor.Beige]: `url(${BeigePanel})`,
}