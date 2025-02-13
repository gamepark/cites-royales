import { FC } from 'react'
import { MaterialHelpProps } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { css } from '@emotion/react'

export const HeroCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props

  return (
    <>
      <h2 css={titleCss}>{t('description.hero.title')}</h2>
      <p>{t(item.location?.rotation ? 'description.hero.verso' : 'description.hero.recto')}</p>
      <p>{t('description.hero.vp')}</p>
    </>
  )

}

const titleCss = css`
  margin-bottom: 0.5em !important;
`