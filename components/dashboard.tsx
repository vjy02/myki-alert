'use client'

import { useState, useEffect } from "react";
import StationPill from "./station-pill";

const stationsData = [
  { id: "1", name: "Station Alpha", lastReportedDate: "2024-03-01T10:00:00Z", towardsCity: true },
  { id: "2", name: "Station Beta", lastReportedDate: "2024-03-03T14:30:00Z",  towardsCity: true },
  { id: "3", name: "Station Gamma", lastReportedDate: "2024-03-02T09:15:00Z",  towardsCity: true },
];

export default function Dashboard() {
    const [stations, setStations] = useState<Station[]>([]);
    const [sortByLatest, setSortByLatest] = useState(true);
  
    useEffect(() => {
      setStations(stationsData);
    }, []);
  
    // Sort stations by `lastReportedDate`
    const sortedStations = [...stations].sort((a, b) =>
      sortByLatest
        ? new Date(b.lastReportedDate).getTime() - new Date(a.lastReportedDate).getTime()
        : new Date(a.lastReportedDate).getTime() - new Date(b.lastReportedDate).getTime()
    );
  
    return (
      <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Stations</h2>
          <button
            className="text-sm text-blue-500"
            onClick={() => setSortByLatest(!sortByLatest)}
          >
            Sort by: {sortByLatest ? "Oldest" : "Newest"}
          </button>
        </div>
  
        <div className="flex flex-wrap gap-2">
          {sortedStations.map((station) => (
            <StationPill key={station.id} name={station.name} lastReportedDate={station.lastReportedDate} towardsCity={station.towardsCity}/>
          ))}
        </div>
      </div>
    );
  }
