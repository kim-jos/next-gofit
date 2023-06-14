import { useRouter } from "next/router";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function BottomNavigationBar() {
  const router = useRouter();
  const pathName = router.asPath.split("?")[0].split("#")[0];
  return (
    <div className="fixed bottom-0 z-20 w-full max-w-[400px]  border-t bg-white">
      <BottomNavigation
        showLabels
        style={{
          background: "transparent",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
        value={pathName}
        onChange={(event, newValue) => {
          router.push(newValue);
        }}
      >
        <BottomNavigationAction label="홈" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="수업"
          value="/classes"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label={"예약"}
          value="/reservations"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction label="충전" value="/" icon={<HomeIcon />} />
        <BottomNavigationAction label="더보기" value="/" icon={<HomeIcon />} />
      </BottomNavigation>
    </div>
  );
}
