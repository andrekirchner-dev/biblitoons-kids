import { useState, useRef, useEffect } from "react";

export function useLazyImage(src: string) {
  const [loaded, setLoaded] = useState("");
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(src);
          observer.disconnect();
        }
      },
      { rootMargin: "50px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [src]);

  return { ref, src: loaded };
}
