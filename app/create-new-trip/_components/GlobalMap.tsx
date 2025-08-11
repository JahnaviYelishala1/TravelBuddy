"use client";

import React, { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useTripDetail } from "@/app/provider";
import { Activity, Itinerary } from "./ChatBox";

function GlobalMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // @ts-ignore
  const { tripDetailInfo } = useTripDetail();

  // Create the map only once
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || "";

    if (!mapRef.current && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [0, 0],
        zoom: 1.7,
        projection: "globe",
      });

      map.on("style.load", () => {
        map.setFog({}); // Adds atmospheric effect
      });

      mapRef.current = map;
    }
  }, []);

  // Update markers when tripDetailInfo changes
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    const bounds = new mapboxgl.LngLatBounds();
    let hasMarkers = false;

    tripDetailInfo?.itinerary?.forEach((itinerary: Itinerary) => {
      itinerary.activities?.forEach((activity: Activity) => {
        if (
          activity?.geo_coordinates?.latitude &&
          activity?.geo_coordinates?.longitude
        ) {
          hasMarkers = true;
          const lng = activity.geo_coordinates.longitude;
          const lat = activity.geo_coordinates.latitude;

          bounds.extend([lng, lat]);

          const newMarker = new mapboxgl.Marker({ color: "red" })
            .setLngLat([lng, lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setText(activity.place_name)
            )
            .addTo(mapRef.current!);

          markersRef.current.push(newMarker);
        }
      });
    });

    // Adjust view to fit markers
    if (hasMarkers) {
      mapRef.current.fitBounds(bounds, { padding: 50 });
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
