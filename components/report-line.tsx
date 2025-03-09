"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

type LineData = {
  line_id: number;
  long_name: string;
  closest_point: string;
  distance: number;
};

const ReportLine = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const [lineId, setLineId] = useState(undefined);
  const [statusMessage, setStatusMessage] = useState("");
  const [stationOptions, setStationOptions] = useState<LineData[]>([]);
  const [loading, setLoading] = useState(true);
  const { executeRecaptcha } = useGoogleReCaptcha();
  console.log(latitude, longitude);
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        value={lineId}
        onChange={(e) => e.target.value ?? setLineId(e.target.value)}
        disabled={loading || stationOptions.length === 0}
      >
        <option value="">Select a Line</option>
        {stationOptions.map((station: LineData, index: number) => (
          <option key={station.line_id} value={station.line_id}>
            {station.long_name}
          </option>
        ))}
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Report Line"}
      </button>

      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

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

export default ReportLine;
