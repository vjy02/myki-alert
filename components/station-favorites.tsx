"use client";

import { useState, useEffect, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StationPillDashboard from "./station-pill-dashboard";
import { lineIdToName, defaultReportedLines } from "@/lib/stations";
import { Station } from "./dashboard";
import { AnyMxRecord } from "dns";

export default function StationFavorites({
  stations,
  favoriteStations,
  onClickFavorite,
}: {
  stations: any;
  favoriteStations: any;
  onClickFavorite: (line: string) => void;
}) {
  const [filterByDirection, setFilterByDirection] = useState("city");
  const [loading, setLoading] = useState<boolean>(false);
  if (!stations) return;
  const filteredStations = useMemo(() => {
    return [...stations].filter((station) =>
      filterByDirection === "city" ? station.towardsCity : !station.towardsCity
    );
  }, [stations, filterByDirection, favoriteStations]);

  return (
    <div className="max-w-md md:max-w-full md:w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 md:text-3xl">Favorites</h2>
      {favoriteStations.length < 1 ? (
        <div className="mb-8">
          Click the{" "}
          <i className="fa-regular text-gray-500 fa-star cursor-pointer text-sm" />{" "}
          icon to save a station line to your favorites.
        </div>
      ) : (
        <Tabs
          value={filterByDirection}
          onValueChange={setFilterByDirection}
          className="w-full"
        >
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
      )}
    </div>
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
    <div className="flex flex-wrap gap-4 md:grid md:grid-cols-3 mt-4 mb-8">
      {stations.map((station, index) => {
        if (!favoriteStations.includes(String(station.line_id))) return;
        return (
          <StationPillDashboard
            key={
              String(index) +
              String(station.line_id) +
              String(station.towardsCity)
            }
            onClickFavorite={onClickFavorite}
            towardsCity={station.towardsCity}
            line_id={String(station.line_id)}
            name={lineIdToName[station.line_id]}
            reportedDateTime={String(station.reportedDateTime) ?? "N/A"}
            isFavorite={favoriteStations.includes(String(station.line_id))}
            totalReports={0}
          />
        );
      })}
    </div>
  );
}
