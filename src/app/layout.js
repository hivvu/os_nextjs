/*
  Layout Component
  - Applies global styles and meta tags
  - Retrieves request headers to set the HTML language attribute dynamically
  - Wraps content with Header and Footer components
*/
import "@/styles/globals.css";
import { headers } from 'next/headers';
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default async function Layout({ children, params }) {
  // Retrieve all request headers using Next.js headers() helper
  const headersList = await headers();
  // Extract the 'x-locale' header to set the document language
  const lang = headersList.get('x-locale');

  return (
    <html lang={lang}>
      <body>
        <Header />

        {children}

        {/* <Footer /> */}
      </body>
    </html>
  );
}