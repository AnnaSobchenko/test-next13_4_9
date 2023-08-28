import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import { fallbackLng, languages } from "../i18n/settings";
import Header from "@/components/Header/Header";

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--roboto-condensed",
});

export const metadata: Metadata = {
  title: "One Pirate Peso Game",
  description:
    "The name peso was given to the 8-real silver coin introduced in 1497, minted at 83⁄8 pesos to a Castilian mark. It was minted in large quantities after the discovery of silver in Mexico.",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  return (
    <html lang={fallbackLng}>
      <head />
      <body className={robotoCondensed.className}>
        <Header lng={lng} />
        {children}
      </body>
    </html>
  );
}
