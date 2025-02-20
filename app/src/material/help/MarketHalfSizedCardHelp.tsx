import { FC } from 'react'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'

export const MarketHalfSizedCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const rules = useRules<CitesRoyalesRules>()!

  return <>{item.id === 0 ? <Trans defaults={'description.half-card.0'} values={{cards: rules.material(MaterialType.SubjectCard).location(location => {
    return location.type === LocationType.Market || location.type === LocationType.Reserve
    }).length}}/> : t('description.half-card.'+item.id) }</>
}