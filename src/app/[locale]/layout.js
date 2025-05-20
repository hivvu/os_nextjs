/*
  Layout Component
  - Applies global styles and meta tags
  - Retrieves request headers to set the HTML language attribute dynamically
  - Wraps content with Header and Footer components
*/
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { wpFetch } from '@/lib/wp-fetch';
import i18nConfig from '@/i18nConfig';
import { notFound } from 'next/navigation';

export default async function Layout(props) {
  const params = await props.params;
  const { children } = props;
  const { locale } = params;
  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  let config = null;

  try {
    config = await wpFetch(locale, `/os/api/all`, {
      next: { revalidate: 60 },
    });
  } catch (error) {
    console.error('Error fetching config:', error);
  }


  return (
    <html lang={locale}>
      <body>
        <Header config={config} />
        {children}
        <Footer config={config} />
      </body>
    </html>
  );
}