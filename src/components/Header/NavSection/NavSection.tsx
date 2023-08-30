import { FC } from "react";
import localFont from "next/font/local";
import { NavBarFCComponentsProps } from "@/interfaces/Props.interface";
import { usePathname } from "next/navigation";
import NavItem from "../NavItem/NavItem";

const myFont = localFont({
  src: "../../../../public/MyFont-Regular.otf",
  display: "swap",
});
const NavSection: FC<NavBarFCComponentsProps> = async ({
  lang,
  setIsOpen,
  textTr,
}) => {
  const pathName = usePathname();

  return (
    <ul
      className={`${myFont.className} flex sm:flex-col lg:flex-row w-full lg:w-auto`}
    >
      <NavItem
        text={textTr.headerNavHome}
        setIsOpen={setIsOpen}
        href={`/${lang}`}
        pathName={pathName}
      />

      <NavItem
        text={textTr.headerNavForum}
        setIsOpen={setIsOpen}
        href={`/${lang}/forum`}
        pathName={pathName}
      />
      <NavItem
        text={textTr.headerNavNew}
        setIsOpen={setIsOpen}
        href={`/${lang}/new`}
        pathName={pathName}
      />

      <NavItem
        text={textTr.headerNavWiki}
        setIsOpen={setIsOpen}
        href={`/${lang}/wiki`}
        pathName={pathName}
      />
      <NavItem
        text={textTr.headerNavAbout}
        setIsOpen={setIsOpen}
        href={`/${lang}/about`}
        pathName={pathName}
      />
    </ul>
  );
};

export default NavSection;
