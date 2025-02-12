import { HistoryEntry, MaterialHistoryProps } from '@gamepark/react-game'
import { FC } from 'react'
import { isStartRule } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { EndSeasonRule } from '@gamepark/cites-royales/rules/EndSeasonRule'

export type SeasonEndHistoryProps = {

} & MaterialHistoryProps

export const SeasonEndHistory: FC<SeasonEndHistoryProps> = (props) => {
  const { move, context } = props
  const rules = new CitesRoyalesRules(context.game)
  const EndSeason = (rules.rulesStep as EndSeasonRule)

  if(isStartRule(move)){
    return (
      <HistoryEntry >
        <Trans defaults={'history.season-end'}  values={{ season: EndSeason.season }}/>
      </HistoryEntry>
    )
  }

  return null

}