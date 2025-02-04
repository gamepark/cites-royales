import { useTranslation } from 'react-i18next'

export const CatchupBonusHeader = () => {
  const { t } = useTranslation()

  return <>{t('header.catchup')}</>
}