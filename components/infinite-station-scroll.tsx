"use client";

import React from "react";
import StationPillHomepage from "./station-pill-homepage";

export const stationList = [
  {
    id: 1,
    name: "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    id: 2,
    name: "Alamein",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-20T14:25:00"),
  },
  {
    id: 3,
    name: "Belgrave",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-22T09:15:00"),
  },
  {
    id: 4,
    name: "Cranbourne",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-18T11:05:00"),
  },
  {
    id: 5,
    name: "Craigieburn",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-21T08:45:00"),
  },
  {
    id: 6,
    name: "Frankston",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-17T16:30:00"),
  },
  {
    id: 7,
    name: "Glen Waverley",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-19T10:00:00"),
  },
  {
    id: 8,
    name: "Hurstbridge",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-23T12:55:00"),
  },
  {
    id: 9,
    name: "Lilydale",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-24T07:20:00"),
  },
  {
    id: 10,
    name: "Mernda",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-16T14:10:00"),
  },
  {
    id: 11,
    name: "Pakenham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-15T13:00:00"),
  },
  {
    id: 12,
    name: "Flemington Racecourse",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-14T15:25:00"),
  },
  {
    id: 13,
    name: "Sandringham",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-13T17:40:00"),
  },
  {
    id: 14,
    name: "Stony Point",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-12T18:50:00"),
  },
  {
    id: 15,
    name: "Sunbury",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-11T09:30:00"),
  },
  {
    id: 16,
    name: "Upfield",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-10T10:15:00"),
  },
  {
    id: 17,
    name: "Werribee",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-09T11:55:00"),
  },
  {
    id: 18,
    name: "Williamstown",
    towardsCity: true,
    reportedDateTime: new Date("2025-02-08T12:05:00"),
  },
  {
    id: 19,
    name: "City Loop",
    towardsCity: false,
    reportedDateTime: new Date("2025-02-07T14:25:00"),
  },
];

export default function InfiniteStationScroll() {
  return (
    <div className="overflow-hidden whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="inline-flex animate-scroll-infinite gap-6">
        {stationList.concat(stationList).map((station, index) => (
          <StationPillHomepage
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
