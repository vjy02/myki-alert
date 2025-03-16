"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // shadcn/ui Tabs
import StationPillDashboard from "./station-pill-dashboard";
import { stationList } from "./infinite-station-scroll";

const stationsData = stationList;

type Station = {
  id: string;
  name: string;
  towardsCity: boolean;
  reportedDateTime: string; 
};

export default function Dashboard() {
  const [stations, setStations] = useState([]);
  const [filterByDirection, setFilterByDirection] = useState("city"); // "city" or "station"
  const [favoriteStations, setFavoriteStations] = useState<string[]>([]);

  useEffect(() => {
    setStations(stationsData);
    const storedFavorites = JSON.parse(localStorage.getItem("StationList") ?? "[]");
    setFavoriteStations(storedFavorites);
  }, []);

  const filteredStations = useMemo(() => {
    return [...stations]
      .filter(station => (filterByDirection === "city" ? station.towardsCity : !station.towardsCity))
      .sort((a, b) => {
        const isAFavA = favoriteStations.includes(a.id);
        const isAFavB = favoriteStations.includes(b.id);

        if (isAFavA && !isAFavB) return -1;
        if (!isAFavA && isAFavB) return 1;

        return new Date(b.reportedDateTime).getTime() - new Date(a.reportedDateTime).getTime();
      });
  }, [stations, filterByDirection, favoriteStations]);

  const onClickFavorite = (id: string) => {
    setFavoriteStations((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(id)) {
        updatedFavorites = prevFavorites.filter((fav) => fav !== id);
      } else {
        updatedFavorites = [...prevFavorites, id];
      }
      localStorage.setItem("StationList", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="max-w-md md:max-w-full md:w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Tabs value={filterByDirection} onValueChange={setFilterByDirection} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="city">To City</TabsTrigger>
          <TabsTrigger value="station">To Station</TabsTrigger>
        </TabsList>

        <TabsContent value="city">
          <StationList stations={filteredStations} onClickFavorite={onClickFavorite} favoriteStations={favoriteStations} />
        </TabsContent>

        <TabsContent value="station">
          <StationList stations={filteredStations} onClickFavorite={onClickFavorite} favoriteStations={favoriteStations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StationList({ stations, onClickFavorite, favoriteStations }: { stations: Station[], onClickFavorite: (id: string) => void, favoriteStations: string[] }) {
  return (
    <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3 mt-4">
      {stations.map((station) => (
        <StationPillDashboard
          key={station.id}
          onClickFavorite={onClickFavorite}
          towardsCity={station.towardsCity}
          id={station.id}
          name={station.name}
          reportedDateTime={station.reportedDateTime ?? "N/A"}
          isFavorite={favoriteStations.includes(station.id)}
          totalReports={0}
        />
      ))}
    </div>
  );
}
