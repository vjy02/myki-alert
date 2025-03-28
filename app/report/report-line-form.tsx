'use client'

import React, { useState, useEffect } from "react";
import { useGeolocated } from "react-geolocated";
import ReportLine from "@/components/report-line";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export default function ReportLineForm() {
  const [isLocationTimeout, setIsLocationTimeout] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const {
    coords,
    isGeolocationAvailable,
    isGeolocationEnabled,
    positionError,
    getPosition,
  } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 15000,
    suppressLocationOnMount: false,
    watchLocationPermissionChange: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!coords) {
        setIsLocationTimeout(true);
      }
    }, 10000);
    return () => clearTimeout(timeout);
  }, [coords]);

  const handleRetryLocation = () => {
    setIsLocationTimeout(false);
    getPosition();
    window.location.reload();
  };

  if (!isMounted) return null; 

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
    >
      {!isGeolocationAvailable ? (
        <div className="text-center">
          <h3>Your browser does not support Geolocation.</h3>
        </div>
      ) : positionError || isLocationTimeout || !isGeolocationEnabled ? (
        <div className="text-center">
          <h3>
            An error occurred while retrieving your location. Please ensure location services
            are enabled for your browser and try again.
          </h3>
          <button
            onClick={handleRetryLocation}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )  : coords ? (
        <ReportLine longitude={coords.longitude} latitude={coords.latitude} />
      ) : (
        <div className="text-center">
          <i className="fa-solid fa-earth-oceania fa-fade"></i>
          <h3>Getting your location data…</h3>
        </div>
      )}
    </GoogleReCaptchaProvider>
  );
}
