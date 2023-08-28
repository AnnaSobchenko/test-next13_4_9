import { useTranslation } from "@/app/i18n";

export default async function Privacy({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "wiki");
  return (
    <>
      <h2>License</h2>
      {/* <License lng={lng} /> */}
    </>
  );
}
