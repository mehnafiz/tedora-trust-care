
import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the current value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create a listener to track changes
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Add the listener to the media query
    media.addEventListener("change", listener);
    
    // Check initially
    setMatches(media.matches);
    
    // Remove the listener when component unmounts
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [matches, query]);

  return matches;
};
