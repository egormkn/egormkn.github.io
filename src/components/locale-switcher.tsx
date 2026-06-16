import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './locale-switcher-select';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
      {routing.locales.map((cur) => (
        <li key={cur}>
          <a>{t('locale', {locale: cur})}</a>
        </li>
      ))}
    </LocaleSwitcherSelect>
  );
}
