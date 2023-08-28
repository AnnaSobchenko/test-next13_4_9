import { useTranslation } from "@/app/i18n";

export default async function New({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "news");
  return (
    <h3 className=" layout text-accent-element-color text-4xl pt-20 pb-20">
      {t("newTitle")} &#129312;
    </h3>
  );
}
