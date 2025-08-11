"use client";

import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./ChatBox";

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  //@ts-ignore
  const { tripDetailInfo } = useTripDetail();

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-74.5, 40],
        zoom: 1.7,
        projection: "globe",
      });
    }

    if (mapRef.current) {
      const markers: mapboxgl.Marker[] = [];

      tripDetailInfo?.itinerary.forEach((itinerary: Itinerary) => {
        itinerary.activities.forEach((activity: Activity) => {
          if (activity?.geo_coordinates?.latitude && activity?.geo_coordinates?.longitude) {
            const newMarker = new mapboxgl.Marker({ color: "red" })
              .setLngLat([activity.geo_coordinates.longitude, activity.geo_coordinates.latitude])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
              )
              .addTo(mapRef.current!);
            markers.push(newMarker);
          }
        });
      });

      // Cleanup
      return () => {
        markers.forEach((m) => m.remove());
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }
  }, [tripDetailInfo]);

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{
          width: "95%",
          height: "85vh",
          borderRadius: 20,
        }}
      />
    </div>
  );
}

export default GlobalMap;
