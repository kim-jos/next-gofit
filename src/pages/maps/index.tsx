import { getClasses } from "@/backend/classes/classes.service";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Home({ gymList }: any) {
  let classes = JSON.parse(gymList);
  const [gyms, setGyms] = useState<any[]>(classes);

  return (
    <Map
      center={{ lat: 37.504822, lng: 127.049357 }}
      style={{ width: "100%", height: "800px" }}
      level={8}
    >
      {gyms.map((gym: any) => (
        <MapMarker
          key={gym.id}
          position={{ lat: gym.coords.latitude, lng: gym.coords.longitude }}
        >
          <div style={{ color: "#000" }}>{gym.name}</div>
        </MapMarker>
      ))}
    </Map>
  );
}

export async function getServerSideProps() {
  let gymList: any = await getClasses();
  gymList = JSON.stringify(gymList);

  return {
    props: { gymList },
  };
}
