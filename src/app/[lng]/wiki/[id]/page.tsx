import { useTranslation } from "@/app/i18n";
// import { ShipCard } from "@/components/WikiPage/ShipCard";

type Props = {
  params: {
    ship: string;
  };
};

export default async function ShipCardPage({
  params: { lng, id },
}: {
  params: { lng: string; id: string };
}) {
  const { t } = await useTranslation(lng, "wiki");
  return <h2>Ship</h2>;
  // return <ShipCard lng={lng} id={id} />;
}
