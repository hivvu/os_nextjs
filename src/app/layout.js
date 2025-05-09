import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata = {
  title: "Odds Scanner UK",
  description: "Odds Scanner main website",
};

const footerData = {
  text: "© 2025 Odds Scanner. Todos os direitos reservados.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Header />
        
        {children}

        <Footer data={footerData} />
      </body>
    </html>
  );
}
