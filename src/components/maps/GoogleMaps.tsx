"use client";

import { useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type?: "physio" | "pt" | "both";
}

interface GoogleMapsProps {
  locations?: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showMarkers?: boolean;
  showControls?: boolean;
  simplifiedStyle?: boolean;
}

// Default Vienna center
const DEFAULT_CENTER = { lat: 48.2082, lng: 16.3738 };
const DEFAULT_ZOOM = 12;

// Example locations in Vienna (can be overridden via props)
const DEFAULT_LOCATIONS: Location[] = [
  {
    id: "1",
    name: "Physio Praxis Wien-Innere Stadt",
    address: "Stephansplatz 1, 1010 Wien",
    lat: 48.2085,
    lng: 16.3731,
    type: "physio",
  },
  {
    id: "2",
    name: "Personal Training Studio Wien-Mariahilf",
    address: "Mariahilfer Straße 77, 1060 Wien",
    lat: 48.197,
    lng: 16.352,
    type: "pt",
  },
  {
    id: "3",
    name: "Jakob Pinger PT Hauptstandort",
    address: "Wiedner Hauptstraße 32, 1040 Wien",
    lat: 48.194,
    lng: 16.367,
    type: "both",
  },
];

// Simplified monochrome map style (as requested in requirements)
const MONOCHROME_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ saturation: -100 }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 40 }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ color: "#000000" }, { lightness: 20 }],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 20 }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 21 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#000000" }, { lightness: 17 }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: 0.2 }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 18 }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 16 }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 19 }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }, { lightness: 17 }],
  },
];

// Custom marker icons for different location types (green as requested)
const getMarkerIcon = (type: Location["type"] = "both"): string => {
  const baseColor = "#4CAF50"; // Green as requested
  const iconSize = 40;
  
  // Different icons for different types
  const icons = {
    physio: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${baseColor}" stroke="#FFFFFF" stroke-width="3"/>
        <path d="M14 20 L20 14 L26 20 L20 26 Z" fill="#FFFFFF"/>
      </svg>
    `)}`,
    pt: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${baseColor}" stroke="#FFFFFF" stroke-width="3"/>
        <path d="M12 20 C12 15.58 15.58 12 20 12 C24.42 12 28 15.58 28 20 C28 24.42 24.42 28 20 28 C15.58 28 12 24.42 12 20 Z" fill="#FFFFFF"/>
        <circle cx="20" cy="20" r="6" fill="${baseColor}"/>
      </svg>
    `)}`,
    both: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${baseColor}" stroke="#FFFFFF" stroke-width="3"/>
        <path d="M14 14 L26 26 M26 14 L14 26" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
      </svg>
    `)}`,
  };
  
  return icons[type];
};

export function GoogleMaps({
  locations = DEFAULT_LOCATIONS,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className = "",
  showMarkers = true,
  showControls = false,
  simplifiedStyle = true,
}: GoogleMapsProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "",
    libraries: ["places"],
  });
  
  const mapOptions = useMemo<google.maps.MapOptions>(() => ({
    disableDefaultUI: !showControls,
    zoomControl: showControls,
    mapTypeControl: showControls,
    scaleControl: showControls,
    streetViewControl: showControls,
    rotateControl: showControls,
    fullscreenControl: showControls,
    styles: simplifiedStyle ? MONOCHROME_STYLE : undefined,
    backgroundColor: "#F4F1EB", // Match design system background
  }), [showControls, simplifiedStyle]);
  
  if (!apiKey) {
    return (
      <div className={`bg-color-accent-highlight border border-color-border p-8 text-center ${className}`}>
        <h3 className="text-lg font-semibold mb-2">Google Maps Integration</h3>
        <p className="text-color-foreground-muted mb-4">
          Map display requires a Google Maps API key.
        </p>
        <div className="inline-block bg-color-background border border-color-border p-4">
          <p className="text-sm font-mono text-color-foreground">
            Add to .env.local:
          </p>
          <p className="text-sm font-mono text-color-accent">
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
          </p>
        </div>
        <div className="mt-6 h-64 bg-color-border flex items-center justify-center">
          <p className="text-color-foreground-muted">Map placeholder</p>
        </div>
      </div>
    );
  }
  
  if (loadError) {
    return (
      <div className={`bg-color-accent-highlight border border-color-border p-8 text-center ${className}`}>
        <h3 className="text-lg font-semibold mb-2">Error loading map</h3>
        <p className="text-color-foreground-muted">
          Failed to load Google Maps. Please check your API key and try again.
        </p>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className={`bg-color-accent-highlight border border-color-border p-8 text-center ${className}`}>
        <div className="animate-pulse-soft">
          <div className="h-64 bg-color-border"></div>
          <p className="mt-4 text-color-foreground-muted">Loading map...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <GoogleMap
        mapContainerClassName="w-full h-96"
        center={center}
        zoom={zoom}
        options={mapOptions}
      >
        {showMarkers && locations.map((location) => (
          <Marker
            key={location.id}
            position={{ lat: location.lat, lng: location.lng }}
            title={location.name}
            icon={{
              url: getMarkerIcon(location.type),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
          />
        ))}
      </GoogleMap>
      
      {locations.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className="border border-color-border p-4 hover:border-color-accent hover:bg-color-accent-highlight transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div 
                    className="w-6 h-6 rounded-none"
                    style={{ 
                      backgroundColor: "#4CAF50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontSize: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {location.type === "physio" ? "P" : location.type === "pt" ? "T" : "B"}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-color-foreground">{location.name}</h4>
                  <p className="text-sm text-color-foreground-muted mt-1">{location.address}</p>
                  <div className="mt-2 flex gap-2">
                    {location.type === "physio" && (
                      <span className="text-xs px-2 py-1 bg-color-accent-highlight text-color-foreground">
                        Physiotherapie
                      </span>
                    )}
                    {location.type === "pt" && (
                      <span className="text-xs px-2 py-1 bg-color-accent-highlight text-color-foreground">
                        Personal Training
                      </span>
                    )}
                    {location.type === "both" && (
                      <>
                        <span className="text-xs px-2 py-1 bg-color-accent-highlight text-color-foreground">
                          Physio
                        </span>
                        <span className="text-xs px-2 py-1 bg-color-accent-highlight text-color-foreground">
                          PT
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}