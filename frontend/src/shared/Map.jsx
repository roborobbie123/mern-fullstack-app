import React, { useRef, useEffect } from "react";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
    console.log(center)
  }, [center, zoom]);

  return <div className='w-full h-full' ref={mapRef}></div>;
};

export default Map;
