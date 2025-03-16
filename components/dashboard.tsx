"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // shadcn/ui Tabs
import StationPillDashboard from "./station-pill-dashboard";

type Station = {
  id: string;
  name: string;
  towardsCity: boolean;
  reportedDateTime: Date; 
};

export const stationsData: Station[] = [
  {
    id: "1",
    name: "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    id: "2",
    name: "Alamein",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    id: "3",
    name: "Belgrave",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-22T09:15:00"),
  },
  {
    id: "4",
    name: "Cranbourne",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-18T11:05:00"),
  },
  {
    id: "5",
    name: "Craigieburn",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-21T08:45:00"),
  },
  {
    id: '6',
    name: "Frankston",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-17T16:30:00"),
  },
  {
    id: '7',
    name: "Glen Waverley",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-19T10:00:00"),
  },
  {
    id: '8',
    name: "Hurstbridge",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-23T12:55:00"),
  },
  {
    id: '9',
    name: "Lilydale",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-24T07:20:00"),
  },
  {
    id: '10',
    name: "Mernda",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-16T14:10:00"),
  },
  {
    id: '11',
    name: "Pakenham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-15T13:00:00"),
  },
  {
    id: '12',
    name: "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-14T15:25:00"),
  },
  {
    id: '13',
    name: "Sandringham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-13T17:40:00"),
  },
  {
    id: '14',
    name: "Stony Point",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-12T18:50:00"),
  },
  {
    id: '15',
    name: "Sunbury",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-11T09:30:00"),
  },
  {
    id: '16',
    name: "Upfield",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-10T10:15:00"),
  },
  {
    id: '17',
    name: "Werribee",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-09T11:55:00"),
  },
  {
    id: '18',
    name: "Williamstown",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-08T12:05:00"),
  },
  {
    id: '19',
    name: "City Loop",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-07T14:25:00"),
  },
];

export default function Dashboard() {
  const [stations, setStations] = useState<Station[]>([]);
  const [filterByDirection, setFilterByDirection] = useState("city"); 
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
      <h2 className="text-2xl font-bold mb-4 md:text-3xl">Dashboard</h2>
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
          reportedDateTime={String(station.reportedDateTime) ?? "N/A"}
          isFavorite={favoriteStations.includes(station.id)}
          totalReports={0}
        />
      ))}
    </div>
  );
}
