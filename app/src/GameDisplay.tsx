/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { FC } from 'react'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export const GameDisplay: FC<GameDisplayProps> = () => {
  return (
    <>
      <GameTable
        xMin={-55}
        xMax={61}
        yMin={-35}
        yMax={35}
        margin={{ top: 7, left: 0, right: 20, bottom: 0 }}
        css={
          process.env.NODE_ENV === 'development' &&
          css`
            border: 1px solid white;
          `
        }
      >
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}
