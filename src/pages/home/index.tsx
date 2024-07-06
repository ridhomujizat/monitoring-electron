import React from "react";
import reactLogo from "@/assets/react.svg";
import viteLogo from "/electron-vite.animate.svg";

export default function HomePage() {
  // Determine the current time of day for a dynamic greeting
  const hours = new Date().getHours();
  const timeOfDay = hours < 12 ? "morning" : hours <= 18 ? "afternoon" : "evening";
  const greeting = `Good ${timeOfDay}`;

  // Creative caption
  const caption = `Welcome to reseach of desktop apps with Electron.`;

  return (
    <div className=" min-h-[400px] w-full flex justify-center items-center flex-col gap-2">
      <div className="flex items-center gap-2">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <p>{greeting}!</p>
      <p id="caption" className=" text-center px-5">{caption}</p>
    </div>
  );
}