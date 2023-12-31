import BottomNavigationBar from "@/components/organisms/BottomNavigationBar";
import { useEffect, useState } from "react";
import { useViewport } from "react-viewport-hooks";

export default function ResponsiveTemplate({ children }) {
  const { vw } = useViewport();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (vw) {
      if (vw > 400) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    }
  }, [vw]);

  return (
    <div className={isDesktop ? "items-center flex justify-center" : ""}>
      <div className={"max-w-[400px]"}>{children}</div>
      <BottomNavigationBar />
    </div>
  );
}
