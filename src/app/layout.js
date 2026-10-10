import { Inter_Tight, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

// Variable name --font-inter rakha hai taake globals.css me kuch na badalna pade
const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: "AU WOODS | Premium Furniture",
  description:
    "Expressive materiality and architectural forms. Discover the AU WOODS collections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}