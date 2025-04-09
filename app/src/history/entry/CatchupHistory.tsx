import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MoveComponentProps } from '@gamepark/react-game'
import { isStartPlayerTurn } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export type CatchupHistoryProps = {} & MoveComponentProps

export const CatchupHistory: FC<CatchupHistoryProps> = (props) => {
  const { move, context } = props

  const cardsDrawn = context.action.consequences.filter(consequence => consequence.location?.type === LocationType.PlayerHand).length

  if (isStartPlayerTurn(move) && cardsDrawn > 0) {
    return (
      <Trans defaults={'history.catchup'}/>
    )
  }

  return null

}
