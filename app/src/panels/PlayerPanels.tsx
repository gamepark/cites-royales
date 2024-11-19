/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { NobleColor } from '@gamepark/cites-royales/NobleColor'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<NobleColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          key={player.id}
          player={player}
          color={playerColorCode[player.id]}
          css={panelPosition(index)}
        />
      ))}
    </>,
    root
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${index === 0 ? 90 : 8.5 + index * 20}em;
  width: 28em;
`

export const playerColorCode: Record<NobleColor, string> = {
  [NobleColor.Brown]: '#693711',
  [NobleColor.Cyan]: '#057E77',
  [NobleColor.Black]: '#057E77',
  [NobleColor.Beige]: '#AC9D67',
}
