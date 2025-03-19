"use client";

import React, { useEffect } from "react";
import StationPillHomepage from "./station-pill-homepage";
import { defaultReportedLines, lineIdToName } from "@/lib/stations";
import { useState } from "react";
import { Station } from "./dashboard";

export default function InfiniteStationScroll() {
  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState<Station[]>(defaultReportedLines);
  useEffect(() => {
    async function fetchStations() {
      setLoading(true);
      try {
        const res = await fetch("/api/latest-reports");
        const stationData = await res.json();
        const updatedStations = stations.map((station) => {
          const matchingReport = stationData.find(
            (report: { line_id: number; towardsCity: boolean }) =>
              report.line_id === Number(station.line_id) &&
              report.towardsCity === station.towardsCity
          );

          return {
            ...station,
            count: matchingReport?.count ?? 0,
            reportedDateTime: matchingReport?.reportedDateTime
              ? matchingReport.reportedDateTime
              : null,
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

  console.log(stations)

  return (
    <div className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="inline-flex animate-scroll-infinite gap-6">
        {stations.map((station, index) => (
          <StationPillHomepage
            key={index}
            name={lineIdToName[station.line_id]}
            towardsCity={station.towardsCity}
            reportedDateTime={station.reportedDateTime}
          />
        ))}
      </div>
    </div>
  );
}
