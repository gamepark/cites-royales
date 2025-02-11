import { HistoryEntry, MaterialHistoryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { isStartPlayerTurn } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export type CatchupHistoryProps = {

} & MaterialHistoryProps

export const CatchupHistory: FC<CatchupHistoryProps> = (props) => {
  const { move, context } = props

  const cardsDrawn = context.action.consequences.filter(consequence => consequence.location?.type === LocationType.PlayerHand).length

  if(isStartPlayerTurn(move) && cardsDrawn > 0){
    return (
      <HistoryEntry >
        <Trans defaults={'history.catchup'}/>
      </HistoryEntry>
    )
  }

  return null

}