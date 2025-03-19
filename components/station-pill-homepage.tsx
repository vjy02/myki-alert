"use client";

import TimeAgo from "timeago-react";

export default function StationPillHomepage({
  name,
  towardsCity,
  reportedDateTime,
}: {
  name: string;
  towardsCity: boolean;
  reportedDateTime: string | null;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-w-60 relative border-blue-800 border-2 shadow-md rounded-xl px-8 py-3">
      <div className="flex gap-1 items-center">
        <i className="fa-solid fa-train-subway text-blue-800 mr-1"></i>
        <p className=" whitespace-nowrap font-bold">{name}</p>
      </div>
      <div className="flex gap-1 text-sm font-bold">
        {towardsCity ? <p>to</p> : <p>from</p>}
        <p>City</p>
      </div>
      {reportedDateTime ? (
        <TimeAgo
          datetime={new Date(reportedDateTime)}
          className="text-xs text-gray-500 mt-2"
        />
      ) : (
        <p className="text-xs text-gray-500 mt-2">No reports</p>
      )}
    </div>
  );
}
