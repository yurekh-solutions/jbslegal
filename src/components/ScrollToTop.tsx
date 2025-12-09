import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
  onClick={scrollToTop}
  className="
    fixed z-50
    h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110

    bottom-8 right-4        /* bottom button position */
    sm:bottom-8 sm:right-6 /* small screens */
    md:bottom-12 md:right-8 /* tablets & desktop */
  "
  size="icon"
  aria-label="Scroll to top"
>
  <ArrowUp className="h-5 w-5" />
</Button>

      )}
    </>
  );
};
