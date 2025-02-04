import { useTranslation } from 'react-i18next'

export const EndSeasonHeader = () => {
  const { t } = useTranslation()

  return <>{t('header.season-end')}</>
}