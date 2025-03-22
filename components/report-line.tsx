"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, memo } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Button } from "./ui/button";

type LineData = {
  line_id: number;
  long_name: string;
  closest_point: string;
  distance: number;
};

export default function ReportLine({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const [lineId, setLineId] = useState<number>(-1);
  const [statusMessage, setStatusMessage] = useState("");
  const [stationOptions, setStationOptions] = useState<LineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [towardsCity, setTowardsCity] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    async function fetchStations() {
      setLoading(true);
      try {
        const stations = await getClosestStationsList({ latitude, longitude });
        setStationOptions(stations);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
        setStationOptions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStations();
  }, [latitude, longitude]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!lineId) {
      setStatusMessage("Please select a Line ID.");
      return;
    }

    if (!executeRecaptcha) {
      setStatusMessage("reCAPTCHA not loaded.");
      return;
    }

    try {
      const token = await executeRecaptcha("report_line");
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/report-line", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          line_id: lineId,
          user_id: session?.user.id ?? "anonymous",
          towards_city: towardsCity,
          captcha_token: token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Line reported successfully!");
      } else {
        setStatusMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setStatusMessage("An error occurred during submission.");
    } finally {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <i className="fa-solid fa-train-subway fa-bounce"></i>
        <h3>Finding nearest stations…</h3>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-10 w-[80vw] md:w-96 max-w-[80vw]"
    >
      {isSubmitted ? (
        <div className=" text-center">
          \( • ᗜ • )/ <br />
          <br />
          Thank you for submitting a report.
        </div>
      ) : (
        <>
          <select
            value={lineId}
            onChange={(e) => setLineId(Number(e.target.value))}
            disabled={loading || stationOptions.length === 0}
            className="border border-gray-600 rounded-sm px-6 py-3 w-full md:w-96 max-w-[80vw]"
          >
            {stationOptions.length === 0 ? (
              <option value="">No stations near you</option>
            ) : (
              <>
                <option value="-1">Select a line</option>
                {stationOptions.map((station: LineData) => (
                  <option
                    key={station.line_id}
                    value={station.line_id}
                    className=""
                  >
                    {station.long_name}
                  </option>
                ))}
              </>
            )}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={towardsCity}
              onChange={(e) => setTowardsCity(e.target.checked)}
              className="form-checkbox dark:bg-slate-300"
            />
            Heading towards the city
          </label>
          <Button
            type="submit"
            disabled={isSubmitting || loading || lineId === -1}
            variant="destructive"
            className="disabled:opacity-50 disabled:pointer-events-none min-w-36"
          >
            {isSubmitting ? (
              <i className="fas fa-spinner fa-spin text-xl text-red-300"></i>
            ) : (
              <>
                <i className="fa-solid fa-bullhorn mr-2"></i>Submit Encounter
              </>
            )}
          </Button>
          {statusMessage && <p>{statusMessage}</p>}
        </>
      )}
    </form>
  );
}

async function getClosestStationsList({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}): Promise<LineData[]> {
  try {
    const url = new URL("/api/available-report-lines", window.location.origin);
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch stations");

    return await response.json();
  } catch (error) {
    console.error("Error fetching stations:", error);
    return [];
  }
}
