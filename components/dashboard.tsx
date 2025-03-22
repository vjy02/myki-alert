"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StationPillDashboard from "./station-pill-dashboard";
import { lineIdToName, defaultReportedLines } from "@/lib/stations";
import StationFavorites from "./station-favorites";

export type Station = {
  line_id: number;
  towardsCity: boolean;
  reportedDateTime: string | null;
};

export default function Dashboard() {
  const [stations, setStations] = useState<Station[]>(defaultReportedLines);
  const [filterByDirection, setFilterByDirection] = useState("city");
  const [favoriteStations, setFavoriteStations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("StationList") ?? "[]"
    );
    setFavoriteStations(storedFavorites);
    async function fetchStations() {
      setLoading(true);
      try {
        const res = await fetch("/api/latest-reports");
        const stationData = await res.json()
        const updatedStations = stations.map(station => {
          const matchingReport = stationData.find((report: { line_id: number; towardsCity: boolean; }) => 
            report.line_id === Number(station.line_id) && report.towardsCity === station.towardsCity
          );
        
          return {
            ...station,
            count: matchingReport?.count ?? 0,
            reportedDateTime: matchingReport?.reportedDateTime ? matchingReport.reportedDateTime : null,
          };
        });
        setStations(updatedStations);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  const filteredStations = useMemo(() => {
    return [...stations]
      .filter((station) =>
        filterByDirection === "city"
          ? station.towardsCity
          : !station.towardsCity
      )
  }, [stations, filterByDirection, favoriteStations]);

  const onClickFavorite = (line_id: string) => {
    setFavoriteStations((prevFavorites) => {
      let updatedFavorites;
      if (prevFavorites.includes(line_id)) {
        updatedFavorites = prevFavorites.filter((fav) => fav !== line_id);
      } else {
        updatedFavorites = [...prevFavorites, line_id];
      }
      localStorage.setItem("StationList", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div className="max-w-md md:max-w-full md:w-full mx-auto">
      {loading ? (
        <div className="flex flex-col gap-1 justify-center items-center h-40">
           <i className="fas fa-spinner fa-spin text-xl"></i>
          <p className="">Collecting latest reports...</p>
        </div>
      ) : (
        <>
          <StationFavorites onClickFavorite={onClickFavorite} stations={stations} favoriteStations={favoriteStations}/>
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">Stations</h2>
          <Tabs value={filterByDirection} onValueChange={setFilterByDirection} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="city">To City</TabsTrigger>
              <TabsTrigger value="station">From City</TabsTrigger>
            </TabsList>
  
            <TabsContent value="city">
              <StationList
                stations={filteredStations}
                onClickFavorite={onClickFavorite}
                favoriteStations={favoriteStations}
              />
            </TabsContent>
  
            <TabsContent value="station">
              <StationList
                stations={filteredStations}
                onClickFavorite={onClickFavorite}
                favoriteStations={favoriteStations}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

function ShimmerCard() {
  return (
    <div className="w-32 h-12 bg-gray-300 rounded-md animate-pulse"></div>
  );
}


function StationList({
  stations,
  onClickFavorite,
  favoriteStations,
}: {
  stations: Station[];
  onClickFavorite: (line_id: string) => void;
  favoriteStations: string[];
}) {
  return (
    <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3 mt-4">
      {stations.map((station, index) => {
        if (favoriteStations.includes(String(station.line_id))) return
        return (
        <StationPillDashboard
          key={String(index) + String(station.line_id) + String(station.towardsCity)}
          onClickFavorite={onClickFavorite}
          towardsCity={station.towardsCity}
          line_id={String(station.line_id)}
          name={lineIdToName[station.line_id]}
          reportedDateTime={String(station.reportedDateTime) ?? "N/A"}
          isFavorite={false}
          totalReports={0}
        />)
})}
    </div>
  );
}
