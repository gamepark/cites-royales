import { FC } from 'react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { getSubjectCity, getSubjectType } from '@gamepark/cites-royales/material/Subject'
import { Trans, useTranslation } from 'react-i18next'
import { css } from '@emotion/react'

export const SubjectCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props
  const subjectType = getSubjectType(item.id)
  const subjectCity = getSubjectCity(item.id)

  return (
    <>
      <h2 css={titleCss}><Trans defaults={'description.card.title'} values={{type:subjectType, city:subjectCity}}/></h2>
      <p>{t('description.card.'+subjectType)}</p>
    </>
  )
}

const titleCss = css`
  margin-bottom: 0.5em !important;
`