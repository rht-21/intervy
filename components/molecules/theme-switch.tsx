"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../atoms/ui/tooltip";
import { Moon, Sun } from "lucide-react";
import { Kbd, KbdGroup } from "../atoms/ui/kbd";
import Loader from "./loader";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // ignore typing contexts
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  if (!mounted) {
    return <Loader />;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="hover:text-primary flex aspect-square h-8 w-8 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200"
          onClick={toggleTheme}
          aria-label="Toggle theme (D)"
        >
          {theme === "light" ? (
            <Sun strokeWidth={1.5} size={20} />
          ) : (
            <Moon strokeWidth={1.5} size={20} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent className="flex items-center justify-center">
        <KbdGroup>
          <p>Toggle Mode</p>
          <Kbd>D</Kbd>
        </KbdGroup>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeSwitch;
