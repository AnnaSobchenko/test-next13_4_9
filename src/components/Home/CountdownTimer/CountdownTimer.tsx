"use client";
import React, { useEffect, useState } from "react";
import { FC } from "react";
import localFont from "next/font/local";
import {
  CountdownTimerProps,
  TextFCComponentsProps,
} from "@/interfaces/Props.interface";
import ThreeVertDots from "@/components/UI/ThreeVertDots/ThreeVertDots";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "../../../../public/MyFont-Regular.otf",
  display: "swap",
});

const convertMs = (ms: number) => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days: string = String(Math.floor(ms / day)).padStart(2, "0");
  // Remaining hours
  const hours: string = String(Math.floor((ms % day) / hour)).padStart(2, "0");
  // Remaining minutes
  const minutes: string = String(
    Math.floor(((ms % day) % hour) / minute)
  ).padStart(2, "0");
  // Remaining seconds
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, "0");
  return { days, hours, minutes, seconds };
};

const initialState = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

export const CountdownTimer: FC<TextFCComponentsProps> = ({ textTr }) => {
  const [difference, setDifference] =
    useState<CountdownTimerProps>(initialState);
  // const { t } = useTranslation(lng, "main");

  const updateTimer = () => {
    setInterval(() => {
      const { days, hours, minutes, seconds } = convertMs(
        Date.parse("Nov 24, 2023") - Date.parse(String(new Date()))
      );

      setDifference({ days, hours, minutes, seconds });

      return { days, hours, minutes, seconds };
    }, 1000);
  };

  useEffect(() => {
    updateTimer();
  }, []);

  return (
    <div className=" w-full relative">
      <div className=" flex flex-col items-center pb-14 pt-14 md:pt-16 lg:pt-32 ">
        <div
          className={`layout flex flex-col  text-center items-center mb-4 md:mb-6 lg:mb-7 `}
        >
          <h2 className={`${myFont.className} mb-1  md:mb-2 md:text-2xl `}>
            {textTr.CountdownTimerTitleNews}
          </h2>
          <p className=" flex text-center  justify-center text-opacity-font-2 text-sm md:text-base lg:text-lg md:w-[400px] lg:w-full">
            {textTr.CountdownTimerDescribeNews}
          </p>
        </div>
        <div className=" w-screen shadow-inner-shadow  h-[300px] md:h-[368px] lg:h-[300px] bg-cover bg-countdown-timer-bg-mob md:bg-countdown-timer-bg-tab lg:bg-countdown-timer-bg-desk ">
          <div
            className={`layout flex flex-col items-center text-center pt-24 md:pt-28 lg:pt-[110px]`}
          >
            <h3
              className={` ${myFont.className} mb-1  md:mb-2  text-3xl md:text-5xl lg:text-7xl`}
            >
              {textTr.CountdownTimerUntilUpdate}
            </h3>
          </div>
        </div>
        <div
          className={`layout flex items-center justify-center mt-[-63px] mb-16 md:mt-[-52px] md:mb-28 lg:mt-[-46px] lg:mb-32 `}
        >
          <div className="flex flex-col items-center">
            <span
              className={` text-5xl md:text-8xl text-opacity-font-4 flex mb-1 `}
              data-days
            >
              {difference.days}
            </span>
            <span className={` ${myFont.className}  text-sm md:text-lg `}>
              {textTr.CountdownTimerDays}
            </span>
          </div>
          <div className=" flex items-center mb-6 mr-2 ml-2">
            <ThreeVertDots />
          </div>
          <div className="flex flex-col items-center">
            <span
              className={` text-5xl md:text-8xl text-opacity-font-4 flex mb-1 `}
              data-hours
            >
              {difference.hours}
            </span>
            <span className={` ${myFont.className}  text-sm md:text-lg `}>
              {textTr.CountdownTimerHours}
            </span>
          </div>
          <div className=" flex items-center mb-6 mr-2 ml-2">
            <ThreeVertDots />
          </div>
          <div className="flex flex-col items-center">
            <span
              className={` text-5xl md:text-8xl text-opacity-font-4 flex mb-1 `}
              data-minutes
            >
              {difference.minutes}
            </span>
            <span className={` ${myFont.className}  text-sm md:text-lg `}>
              {textTr.CountdownTimerMinutes}
            </span>
          </div>
          <div className=" flex items-center mb-6 mr-2 ml-2">
            <ThreeVertDots />
          </div>
          <div className="flex flex-col items-center">
            <span
              className={`sm:text-5xl md:text-8xl text-opacity-font-4 flex mb-1 `}
              data-seconds
            >
              {difference.seconds}
            </span>
            <span className={` ${myFont.className} sm:text-sm md:text-lg `}>
              {textTr.CountdownTimerSeconds}
            </span>
          </div>
        </div>
        <a
          href="#"
          className={`layout ${myFont.className} flex justify-center text-lg underline md:text-2xl`}
        >
          {textTr.CountdownTimerUpdateNews}
        </a>
      </div>
    </div>
  );
};

// let counterUpdate = { days, hours, minutes, seconds };
// setTimeout(function updateTimer() {
//   const counterTimer = () => {
//     ({ days, hours, minutes, seconds } = convertMs(
//       Date.parse("Aug 24, 2023") - Date.parse(String(new Date()))
//     ));

//     counterUpdate = { days, hours, minutes, seconds };
//     console.log("counterUpdate func:>> ", counterUpdate);
//     return counterUpdate;
//   };
//   counterTimer();
//   setTimeout(updateTimer, 1000);
// }, 1000);
