import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {notFound} from 'next/navigation';

export const metadata = {
  title: "Odds Scanner UK",
  description: "Odds Scanner main website",
};

const footerData = {
  sitename: "Odds Scanner",
  copyright: "© 2025 Odds Scanner. Todos os direitos reservados.",
};


export default async function LocaleLayout({ children, params }) {
  
 
  return (
    <html lang="pt">
      <meta name="apple-mobile-web-app-title" content="Odds Scanner" />
      <body>
        {children}
      </body>
    </html>
  );
}