import { getDictionary } from "./dictionaries";
export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-main-background">
      <h2 className=" text-main-font-color">{dict.main.mainTitle}</h2>
    </main>
  );
}
