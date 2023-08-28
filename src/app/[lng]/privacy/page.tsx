import { useTranslation } from "@/app/i18n";
// import { PrivPolLic } from "@/components/PrivPolLic/PrivPolLic";

export default async function Privacy({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng, "wiki");
  return (
    <>
      <h2>PrivPolLic</h2> {/* <PrivPolLic lng={lng} /> */}
    </>
  );
}
