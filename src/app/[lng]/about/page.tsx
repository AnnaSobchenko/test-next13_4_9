import { useTranslation } from "@/app/i18n";

export default async function About({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "about");
  return (
    <h3 className=" layout text-accent-element-color text-4xl pt-20 pb-20">
      {t("aboutTitle")} &#129356;
    </h3>
  );
}
