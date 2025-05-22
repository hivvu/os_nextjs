/*
  Layout Component
  - Applies global styles and meta tags
  - Retrieves request headers to set the HTML language attribute dynamically
  - Wraps content with Header and Footer components
*/
import { ThemeScripts } from "@/components";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import i18nConfig from '@/i18nConfig';
import { wpFetch } from '@/lib/wp-fetch';
import "@/styles/global.scss";
import { Inter, Sora } from 'next/font/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

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
    <html lang={config?.theme_options?.language?.iso_code} className={`${inter.variable} ${sora.variable}`}>
      <head>
        <meta name="application-name" content={config?.themeOptions?.meta?.title} />
        <meta name="apple-mobile-web-app-title" content={config?.themeOptions?.meta?.title} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href={config?.network_data?.branding?.favicon?.url} />
        <link rel="apple-touch-icon" href={config?.network_data?.branding?.favicon?.url} />
        <link rel="alternate" href={config?.network_data?.static_site?.production_url} hrefLang={config?.theme_options?.language?.code} />
        <link rel="alternate" href={config?.network_data?.static_site?.production_url} hrefLang="x-default" />

        {/* External and inline scripts */}
        <ThemeScripts scripts={config?.theme_options?.scripts} />

        {/* Google Tag Manager */}
        {Array.isArray(config?.theme_options?.scripts?.google_tag_manager) && config?.theme_options?.scripts?.google_tag_manager.map((id) => (
          <Script
            key={id}
            id={id}
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${id}');`,
            }}
          />
        ))}

        {/* Facebook Pixel */}
        {Array.isArray(config?.theme_options?.scripts?.facebook_pixel) && config?.theme_options?.scripts?.facebook_pixel.map((pixel) => (
          <noscript
            key={pixel.id}
            dangerouslySetInnerHTML={{
              __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel.id}&ev=PageView&noscript=1" />`,
            }}
          />
        ))}

      </head>
      <body data-site_id={config?.theme_options?.site?.id}>
        {/* GTM NoScript fallback */}
        {Array.isArray(config?.theme_options?.scripts?.google_tag_manager) && config?.theme_options?.scripts?.google_tag_manager.map((id) => (
          <noscript
            key={id}
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display: none; visibility: hidden;" />`,
            }}
          />
        ))}
        <Header config={config} />
        {children}
        <Footer config={config} />
      </body>
    </html>
  );
}