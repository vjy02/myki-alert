"use client";

import TimeAgo from "timeago-react";

export default function StationPill({
  name,
  towardsCity,
  reportedDateTime,
}: {
  name: string;
  towardsCity: boolean;
  reportedDateTime: Date;
}) {
  return (
      <div className="flex flex-col items-center justify-center w-48 relative border-gray-400 shadow-md border rounded-xl px-6 py-1">
        <div className="flex gap-2">
        <p>{name}</p>
        {towardsCity ? <p>➡</p> : <p>⬅</p>}
        <p>City</p>
        </div>
        <TimeAgo
        datetime={reportedDateTime}
        className="text-xs text-gray-500 self-end"
        />
      </div>
  );
}
