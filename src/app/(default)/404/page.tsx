import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>404: {t('title')}</h1>
    </div>
  );
}
