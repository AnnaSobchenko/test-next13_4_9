"use client";
import { LngTextFCComponentsProps } from "@/interfaces/Props.interface";
import { FC, useEffect } from "react";
import UpperHeader from "./UpperHeader/UpperHeader";
// import NavBar from "./NavBar/NavBar";

const Header: FC<LngTextFCComponentsProps> = ({ lng, textTr }) => {
  // const Header = ({ lng }: IHeaderProps) => {
  useEffect(() => {
    Boolean(localStorage.getItem("lng")) || localStorage.setItem("lng", lng);
  }, []);
  return (
    <div className="bg-main-background">
      <UpperHeader lng={lng} textTr={textTr} />
      {/* <NavBar lng={lng} /> */}
    </div>
  );
};

export default Header;
