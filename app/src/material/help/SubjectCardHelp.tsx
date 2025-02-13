import { FC } from 'react'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { Trans, useTranslation } from 'react-i18next'
import { LocationType } from '@gamepark/cites-royales/material/LocationType'
import { CitesRoyalesRules } from '@gamepark/cites-royales/CitesRoyalesRules'
import { MaterialType } from '@gamepark/cites-royales/material/MaterialType'
import { css } from '@emotion/react'

export const SubjectCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const rules = useRules<CitesRoyalesRules>()!
  const { item } = props

  const isFlipped =  item.id === undefined || !!item.location?.rotation
  const subjectType = getSubjectType(item.id)
  const subjectCity = getSubjectCity(item.id)

  return (
    <>
      <h2 css={titleCss}>{isFlipped ? t('description.card.title.face-down') : <Trans defaults={'description.card.title.face-up'} values={{type:subjectType, city:subjectCity}}/>}</h2>
      {!isFlipped && <p>{t('description.card.' + subjectType)}</p>}
      {isFlipped
        && item.location!.type === LocationType.DrawPile
        && <Trans defaults={'description.card.draw-pile'} values={{cards: rules.material(MaterialType.SubjectCard).location(LocationType.DrawPile).length}}/>
      }
    </>
  )
}

const titleCss = css`
    margin-bottom: 0.5em !important;
`