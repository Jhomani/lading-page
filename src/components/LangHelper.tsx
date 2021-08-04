import React from 'react';
import languages from 'locales';
import { useSelector } from 'react-redux';
import { getOrCreateStore } from "@utils/with-redux-store";

interface InLagCom {
  langKey: string
}

export const Language = ({ langKey }: InLagCom) => {
  const { locale } = useSelector(storage => storage.app);
  let message = languages[locale][langKey] ?? 'no fout message';

  return <>{message}</>;
}

export const getRawMessage = (key: string): string => {
  const { locale } = getOrCreateStore().getState().app;
  let message = languages[locale][key] ?? 'no fout message';

  return message;
}