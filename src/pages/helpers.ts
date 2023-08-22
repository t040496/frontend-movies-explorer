import { useMediaQuery } from "hooks/useMediaQuery";
import { useMemo } from "react";

export const useAllMoviesPaginatorScreenSize = () => {
  const is1280screen = useMediaQuery({
    specificQuery: [">=", 1280],
  });

  const is990screen = useMediaQuery({
    specificQuery: [">=", 990],
  });

  const is768screen = useMediaQuery({
    specificQuery: [">=", 768],
  });

  const is320screen = useMediaQuery({
    specificQuery: [">=", 320],
  });

  return useMemo<"xl" | "lg" | "md" | "sm">(() => {
    if (is1280screen) {
      return "xl";
    }

    if (is990screen) {
      return "lg";
    }

    if (is768screen) {
      return "md";
    }

    return "sm";
  }, [is1280screen, is990screen, is768screen, is320screen]);
};
