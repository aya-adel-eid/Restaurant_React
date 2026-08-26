import { useEffect } from "react";

export function ScrollToTop({ router, children }) {
  useEffect(() => {
    const unsubscribe = router.subscribe(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => unsubscribe();
  }, [router]);

  return children;
}
