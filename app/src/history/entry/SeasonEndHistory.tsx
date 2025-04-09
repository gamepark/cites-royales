import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { EndSeasonRule } from '@gamepark/cites-royales/rules/EndSeasonRule'
import { MoveComponentProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export type SeasonEndHistoryProps = {} & MoveComponentProps

export const SeasonEndHistory: FC<SeasonEndHistoryProps> = (props) => {
  const { context } = props
  const rules = new CitesRoyalesRules(context.game)
  const EndSeason = (rules.rulesStep as EndSeasonRule)

  return (
    <Trans defaults={'history.season-end'} values={{ season: EndSeason.season }}/>
  )
}
