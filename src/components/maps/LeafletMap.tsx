"use client";

import { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Load leaflet CSS only on client side
if (typeof window !== 'undefined') {
  // @ts-expect-error: Dynamic import of CSS only on client side
  import("leaflet/dist/leaflet.css");
}

// Dynamic import for SSR compatibility
const MapContainerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const MarkerComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const PopupComponent = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type?: "physio" | "pt" | "both";
}

interface LeafletMapProps {
  locations?: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  className?: string;
  showMarkers?: boolean;
  showControls?: boolean;
  simplifiedStyle?: boolean;
  darkMode?: boolean;
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

// Tile layer URLs for different styles
const TILE_LAYERS = {
  light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
  monochrome: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
};

export function LeafletMap({
  locations = DEFAULT_LOCATIONS,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  className = "",
  showMarkers = true,
  showControls = true,
  simplifiedStyle = true,
  darkMode = false,
}: LeafletMapProps) {
  const [leaflet, setLeaflet] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  
  // Load leaflet only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import("leaflet").then((L) => {
        setLeaflet(L.default || L);
      });
    }
  }, []);
  
  // Custom marker icons for different location types (green as requested)
  const createMarkerIcon = useMemo(() => {
    if (!leaflet) return () => null;
    
    return (type: Location["type"] = "both", isDarkMode: boolean = false) => {
      const baseColor = "#4CAF50"; // Green as requested
      const backgroundColor = isDarkMode ? "#1a1a1a" : "#ffffff";
      
      // Different icons for different types
      const iconHtml = (type: Location["type"]) => {
        const size = 40;
        
        if (type === "physio") {
          return `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${baseColor};
              border: 3px solid ${backgroundColor};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${backgroundColor};
              font-weight: bold;
              font-size: 12px;
            ">
              P
            </div>
          `;
        } else if (type === "pt") {
          return `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${baseColor};
              border: 3px solid ${backgroundColor};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${backgroundColor};
              font-weight: bold;
              font-size: 12px;
            ">
              T
            </div>
          `;
        } else {
          return `
            <div style="
              width: ${size}px;
              height: ${size}px;
              background-color: ${baseColor};
              border: 3px solid ${backgroundColor};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${backgroundColor};
              font-weight: bold;
              font-size: 12px;
            ">
              B
            </div>
          `;
        }
      };

      return leaflet.divIcon({
        html: iconHtml(type),
        className: "custom-marker",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });
    };
  }, [leaflet]);
  
  // Choose tile layer based on style preferences
  const tileUrl = useMemo(() => {
    if (darkMode) return TILE_LAYERS.dark;
    if (simplifiedStyle) return TILE_LAYERS.monochrome;
    return TILE_LAYERS.light;
  }, [darkMode, simplifiedStyle]);

  const attribution = darkMode 
    ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  // Don't render map until leaflet is loaded
  if (!leaflet) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-96 bg-color-border flex items-center justify-center">
          <p className="text-color-foreground-muted">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="w-full h-96">
        <MapContainerComponent
          center={[center.lat, center.lng]}
          zoom={zoom}
          scrollWheelZoom={showControls}
          zoomControl={showControls}
          attributionControl={false}
          className="w-full h-full"
          style={{ backgroundColor: darkMode ? "#1a1a1a" : "#F4F1EB" }}
        >
          <TileLayerComponent
            url={tileUrl}
            attribution={attribution}
          />
          {showMarkers && locations.map((location) => (
            <MarkerComponent
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createMarkerIcon(location.type, darkMode)}
            >
              <PopupComponent>
                <div className="p-2">
                  <h4 className="font-bold text-sm">{location.name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{location.address}</p>
                  <div className="mt-2">
                    {location.type === "physio" && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800">
                        Physiotherapie
                      </span>
                    )}
                    {location.type === "pt" && (
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800">
                        Personal Training
                      </span>
                    )}
                    {location.type === "both" && (
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800">
                        Physio + PT
                      </span>
                    )}
                  </div>
                </div>
              </PopupComponent>
            </MarkerComponent>
          ))}
        </MapContainerComponent>
      </div>
      
      {locations.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`border ${darkMode ? 'border-gray-700 bg-gray-900 hover:border-green-600 hover:bg-gray-800' : 'border-color-border hover:border-color-accent hover:bg-color-accent-highlight'} p-4 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div 
                    className="w-6 h-6 rounded-none flex items-center justify-center text-xs font-bold text-white"
                    style={{ 
                      backgroundColor: "#4CAF50",
                    }}
                  >
                    {location.type === "physio" ? "P" : location.type === "pt" ? "T" : "B"}
                  </div>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-color-foreground'}`}>{location.name}</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-color-foreground-muted'} mt-1`}>{location.address}</p>
                  <div className="mt-2 flex gap-2">
                    {location.type === "physio" && (
                      <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-color-accent-highlight text-color-foreground'}`}>
                        Physiotherapie
                      </span>
                    )}
                    {location.type === "pt" && (
                      <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-color-accent-highlight text-color-foreground'}`}>
                        Personal Training
                      </span>
                    )}
                    {location.type === "both" && (
                      <>
                        <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-color-accent-highlight text-color-foreground'}`}>
                          Physio
                        </span>
                        <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-gray-800 text-white' : 'bg-color-accent-highlight text-color-foreground'}`}>
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