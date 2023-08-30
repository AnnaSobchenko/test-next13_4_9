import BorderScreen from "@/components/UI/BorderScreen/BorderScreen";
import { useTranslations } from "next-intl";

export default function Main({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = useTranslations("Index");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h2>{t("mainTitle")}</h2>
      <div className="hidden lg:inline-block fixed top-0 left-0 w-full h-full opacity-50 pointer-events-none z-50">
        <BorderScreen />
      </div>
    </main>
  );
}
