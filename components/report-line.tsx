"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const ReportLine = ({
  latitude,
  longitude,
}: {
  latitude: Number;
  longitude: Number;
}) => {
  const [lineId, setLineId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!lineId) {
      setStatusMessage("Please enter a Line ID.");
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
      <input
        type="text"
        value={lineId}
        onChange={(e) => setLineId(e.target.value)}
        placeholder="Enter Line ID"
      />
      <button type="submit">Report Line</button>
      {statusMessage && <p>{statusMessage}</p>}
    </form>
  );
};

export default ReportLine;
