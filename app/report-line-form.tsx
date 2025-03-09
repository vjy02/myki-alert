"use client";

import ReportLine from "@/components/report-line";
import { useGeolocated } from "react-geolocated";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useState, useEffect } from "react";

const ReportLineForm = () => {
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });

  const [isLocationTimeout, setIsLocationTimeout] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!coords) {
        setIsLocationTimeout(true); 
      }
    }, 10000); 
    return () => clearTimeout(timeout); 
  }, [coords]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      {coords && isGeolocationAvailable && isGeolocationEnabled ? (
        <ReportLine
          longitude={coords?.longitude ?? 0}
          latitude={coords?.latitude ?? 0}
        />
      ) : isLocationTimeout ? (
        <h3>Please enable location services to continue or your device might not be compatible.</h3>
      ) : (
        <h3>Loading...</h3>
      )}
    </GoogleReCaptchaProvider>
  );
};

export default ReportLineForm;
