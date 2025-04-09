import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const HeroCardHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props

  return (
    <>
      <h2>{t('description.hero.title')}</h2>
      <p>{t(item.location?.rotation ? 'description.hero.verso' : 'description.hero.recto')}</p>
      <p>{t('description.hero.vp')}</p>
    </>
  )

}
