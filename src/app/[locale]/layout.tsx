import "./globals.scss";
import Header from "@/components/Header/Header";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--roboto-condensed",
});

export const metadata = {
  title: "One Pirate Peso Game",
  description:
    "The name peso was given to the 8-real silver coin introduced in 1497, minted at 83⁄8 pesos to a Castilian mark. It was minted in large quantities after the discovery of silver in Mexico.",
};

export default async function RootLayout({ children, params }) {
  console.log("params :>> ", params);

  const locale = useLocale();
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={robotoCondensed.className}>
        <Header lng={locale} />
        {children}
      </body>
    </html>
  );
}
