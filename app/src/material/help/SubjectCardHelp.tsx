import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const SubjectCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const rules = useRules<CitesRoyalesRules>()!
  const { item } = props

  const isFlipped = item.id === undefined || !!item.location?.rotation
  const subjectType = getSubjectType(item.id)
  const subjectCity = getSubjectCity(item.id)

  return (
    <>
      <h2>{isFlipped ? t('description.card.title.face-down') :
        <Trans defaults={'description.card.title.face-up'} values={{ type: subjectType, city: subjectCity }}/>}</h2>
      {!isFlipped && <p><Trans defaults={'description.card.' + subjectType}><strong/></Trans></p>}
      {!subjectCity && <p><Trans defaults={'description.card.white'}/></p>}
      {isFlipped
        && item.location!.type === LocationType.DrawPile
        && <Trans defaults={'description.card.draw-pile'} values={{ cards: rules.material(MaterialType.SubjectCard).location(LocationType.DrawPile).length }}/>
      }

    </>
  )
}
