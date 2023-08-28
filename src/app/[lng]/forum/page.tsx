import { useTranslation } from "@/app/i18n";
export default async function Forum({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "forum");
  return (
    <h3 className=" layout text-accent-color text-4xl pt-20 pb-20">
      {t("forumTitle")}
      &#128676;
    </h3>
  );
}
