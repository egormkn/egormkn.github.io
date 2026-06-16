"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <label className="daisy-btn daisy-swap daisy-swap-rotate">
      <input
        type="checkbox"
        className="invisible"
        checked={resolvedTheme === "dark"}
        onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
      />

      <FontAwesomeIcon className="daisy-swap-on" icon={faMoon} size="lg" />
      <FontAwesomeIcon className="daisy-swap-off" icon={faSun} size="lg" />
    </label>
  );
};

export default ThemeSwitcher;
