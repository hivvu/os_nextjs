import "./globals.css";

export const metadata = {
  title: "Odds Scanner",
  description: "Odds Scanner main website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
