"use client";

import ReportLine from "@/components/report-line";
import { useGeolocated } from "react-geolocated";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReportLineForm = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      {isGeolocationAvailable && isGeolocationEnabled ? (
        <ReportLine
          longitude={coords?.longitude ?? 0}
          latitude={coords?.latitude ?? 0}
        />
      ) : (
        <h3>Please enable your location for reporting.</h3>
      )}
    </GoogleReCaptchaProvider>
  );
};

export default ReportLineForm;
