import { useLayoutEffect, useState } from "react";

export interface TUseMediqQueryHookProps {
  query?: string;
  specificQuery?: [">=" | "<=", number];
}
export const useMediaQuery = ({
  query: queryOrig,
  specificQuery,
}: TUseMediqQueryHookProps): boolean => {
  let query = queryOrig || "";

  if (specificQuery?.length === 2) {
    const [comparisonChar, size] = specificQuery;
    let origin = "min";

    if (comparisonChar === "<=") {
      origin = "max";
    }

    query = `(${origin}-width:${size}px)`;
  }

  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }

    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);

  return matches;
};
