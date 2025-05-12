import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export const metadata = {
  title: "Odds Scanner UK",
  description: "Odds Scanner main website",
};

const footerData = {
  sitename: "Odds Scanner",
  copyright: "© 2025 Odds Scanner. Todos os direitos reservados.",
};


export default async function LocaleLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  // if (!hasLocale(routing.locales, locale)) {
  //   notFound();
  // }
 
  return (
    <html lang={locale}>
      <meta name="apple-mobile-web-app-title" content="Odds Scanner" />
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}