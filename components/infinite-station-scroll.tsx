'use client'

import React from "react";
import StationPill from "./station-pill";

const stationList = [
  {
    name:   "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    name: "Alamein",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    name: "Belgrave",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-22T09:15:00"),
  },
  {
    name: "Cranbourne",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-18T11:05:00"),
  },
  {
    name: "Craigieburn",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-21T08:45:00"),
  },
  {
    name: "Frankston",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-17T16:30:00"),
  },
  {
    name: "Glen Waverley",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-19T10:00:00"),
  },
  {
    name: "Hurstbridge",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-23T12:55:00"),
  },
  {
    name: "Lilydale",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-24T07:20:00"),
  },
  {
    name: "Mernda",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-16T14:10:00"),
  },
  {
    name: "Pakenham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-15T13:00:00"),
  },
  {
    name: "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-14T15:25:00"),
  },
  {
    name: "Sandringham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-13T17:40:00"),
  },
  {
    name: "Stony Point",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-12T18:50:00"),
  },
  {
    name: "Sunbury",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-11T09:30:00"),
  },
  {
    name: "Upfield",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-10T10:15:00"),
  },
  {
    name: "Werribee",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-09T11:55:00"),
  },
  {
    name: "Williamstown",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-08T12:05:00"),
  },
  {
    name: "City Loop",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-07T14:25:00"),
  },
];

export default function InfiniteStationScroll() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-scroll-infinite gap-4">
        {stationList.concat(stationList).map((station, index) => (
          <StationPill
            key={index}
            name={station.name}
            towardsCity={station.towardsCity}
            reportedDateTime={station.reportedDateTime}
          />
        ))}
      </div>
    </div>
  );
}
