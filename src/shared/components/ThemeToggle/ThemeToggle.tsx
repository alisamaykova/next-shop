"use client";

import { useEffect, useState } from "react";

import styles from "./ThemeToggle.module.scss";

import MoonIcon from "@/shared/components/icons/MoonIcon/MoonIcon";
import SunIcon from "@/shared/components/icons/SunIcon/SunIcon";

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  return (
    <button className={styles.toggle} onClick={toggleTheme}>
      {isDark ? (
        <SunIcon width={50} height={50} />
      ) : (
        <MoonIcon width={50} height={50} />
      )}
    </button>
  );
};
