'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import LangContext from '@/lib/lang-context';

export default function LangLayout({ children, params }) {
  const supportedLangs = ['fr', 'es', 'it', 'br', 'pt', 'us'];
  const resolvedParams = use(params);
  const locale = resolvedParams.locale;

  if (!supportedLangs.includes(locale)) {
    return notFound(); 
  }

  return (
    <LangContext.Provider value={locale}>
      {children}
    </LangContext.Provider>
  );
}
