import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  };

  return (
    <>
      {showTopBtn && (
        <Button
          onClick={goToTop}
          className="fixed h-12 w-12 bottom-12 right-12 opacity-90 shadow-md"
          size="icon"
        >
          <ArrowUpToLine className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};
