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

  const title = `theme: ${theme ?? "undefined"}, resolved: ${resolvedTheme ?? "undefined"}`;

  return (
    <label title={mounted ? title : "unmounted"} className="daisy-btn daisy-swap daisy-btn-square daisy-swap-rotate">
      {mounted && (
        <>
          <input
            type="checkbox"
            className="daisy-theme-controller hidden"
            value="dark"
            checked={resolvedTheme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            suppressHydrationWarning
          />
          <FontAwesomeIcon className="daisy-swap-off" icon={faSun} size="lg" />
          <FontAwesomeIcon className="daisy-swap-on" icon={faMoon} size="lg" />
        </>
      )}
    </label>
  );
};

export default ThemeSwitcher;
