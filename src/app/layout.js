import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {notFound} from 'next/navigation';
import { headers } from 'next/headers';

const footerData = {
  sitename: "Odds Scanner",
  copyright: "© 2025 Odds Scanner. Todos os direitos reservados.",
};

export default async function Layout({ children, params }) {
  const headersList = await headers();
  
  const lang = headersList.get('x-locale');

  return (
    <html lang={lang}>
      <meta name="apple-mobile-web-app-title" content="Odds Scanner" />
      <body>
        <Header />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}