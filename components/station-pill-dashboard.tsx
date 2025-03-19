"use client";

import TimeAgo from "timeago-react";

export default function StationPillDashboard({
  line_id,
  name,
  reportedDateTime,
  onClickFavorite,
  isFavorite,
  totalReports,
  towardsCity,
}: {
  line_id: string;
  name: string;
  reportedDateTime: string;
  onClickFavorite: (id: string) => void;
  isFavorite: boolean;
  totalReports: number;
  towardsCity: boolean;
}) {
  const reportedDate = new Date(reportedDateTime);
  const now = new Date();
  const hoursSinceReport = Math.floor(
    (now.getTime() - reportedDate.getTime()) / (1000 * 3600)
  );
  let statusMessage = "No reports";

  let statusColor = "text-green-500";
  if (hoursSinceReport <= 2) {
    statusColor = "text-red-500";
    statusMessage = "Alert";
  } else if (hoursSinceReport <= 4) {
    statusColor = "text-yellow-500";
    statusMessage = "Caution";
  }

  return (
    <div className="flex flex-col items-start justify-between min-w-60 border-l-8 border-blue-800 border w-full shadow-md px-4 py-3 relative gap-2">
      <div className="flex gap-1 items-center place-self-start ">
        <i className="fa-solid fa-train-subway text-blue-800 mr-1"></i>
        <p className="whitespace-nowrap font-bold">{name}</p>
        <div className="flex gap-1 font-bold">
          {towardsCity ? <p>to</p> : <p>from</p>}
          <p>City</p>
        </div>
      </div>
      <div className="flex gap-2 text-sm justify-center items-center">
        <i className={`fa-solid fa-circle ${statusColor}`}></i>
        <p>{statusMessage}</p>
      </div>
      <div className="flex w-full justify-between items-center ">
        <div className="flex text-xs text-gray-500 gap-1">
          <p>Last updated:</p>
          <TimeAgo datetime={reportedDateTime} />
        </div>
        {/*<p className="text-xs">See Stats</p>*/}
      </div>
      <button
        onClick={() => onClickFavorite(line_id)}
        className="absolute top-2 right-2"
      >
        <i
          className={`${isFavorite ? "fa-solid text-yellow-500" : "fa-regular text-gray-500"} fa-star cursor-pointer`}
        />
      </button>
    </div>
  );
}
