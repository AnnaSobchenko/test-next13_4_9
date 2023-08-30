import { NewsTextFCComponentsProps } from "@/interfaces/Props.interface";
import { FC } from "react";
import localFont from "next/font/local";
import dataNews from "../../../public/data/dataNews.json";

const myFont = localFont({
  src: "../../../public/MyFont-Regular.otf",
  display: "swap",
});

const News: FC<NewsTextFCComponentsProps> = async ({ textTr }) => {
  const textAccentFont = myFont.className;
  return (
    <div className="layout pt-20">
      <ul>
        {dataNews.map(({ id, img }) => (
          <li key={id} className="pb-8 last:pb-14">
            <h2
              className={`text-center mb-5 text-xl md:text-2xl ${textAccentFont}`}
            >
              {`${textTr}.${id}.name`}
            </h2>
            <div className="md:flex gap-4 justify-center">
              <img
                src={img}
                alt="logo-news"
                className="md:w-[450px] md:h-[250px] sm:mb-4"
              />
              <p className="text-sm text-opacity-font-2 text-sans text-justify mb-6 lg:text-lg">
                {`${textTr}.${id}.text`}
                {id}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
