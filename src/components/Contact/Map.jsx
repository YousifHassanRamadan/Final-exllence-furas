import { useRef } from "react";
import { useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Icon } from "ol/style";

const STORE_LOCATION = [39.8262, 21.4225];

const MapComponent = () => {
  const mapRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const coordinates = fromLonLat(STORE_LOCATION);
    const markerFeature = new Feature({
      geometry: new Point(coordinates),
    });

    // Enhanced marker SVG with animation and better styling
    const enhancedMarkerSVG = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 64" width="48" height="64">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="0" dy="2" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feColorMatrix result="matrixOut" in="blurOut" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
            <feBlend in="SourceGraphic" in2="matrixOut" mode="normal" />
          </filter>
        </defs>
        <g filter="url(#shadow)">
          <path d="M24 0C14.4 0 6.4 8 6.4 17.6C6.4 30.4 24 48 24 48C24 48 41.6 30.4 41.6 17.6C41.6 8 33.6 0 24 0Z" 
                fill="red" 
                stroke="#ffffff" 
                stroke-width="2"/>
          <circle cx="24" cy="17.6" r="8" 
                  fill="#ffffff"/>
        </g>
      </svg>
    `);

    const markerStyle = new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: `data:image/svg+xml,${enhancedMarkerSVG}`,
        scale: 0.8,
      }),
    });

    markerFeature.setStyle(markerStyle);

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [markerFeature],
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: coordinates,
        zoom: isMobile ? 12 : 13,
      }),
      controls: [],
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      map.setTarget(undefined);
    };
  }, [isMobile]);

  return (
    <div className="px-10 sm:px-6">
      <div
        ref={mapRef}
        className="w-full h-[400px] sm:h-[600px] overflow-hidden shadow-lg"
      />
    </div>
  );
};

export default MapComponent;
