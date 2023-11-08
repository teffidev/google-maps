import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Input, Button, Flex, Box, Skeleton } from "@chakra-ui/react";

const libraries = ["places", "geometry"];

const Map2 = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 6.25184, lng: -75.56359 });
  const [radius, setRadius] = useState(5000); // Radio en metros
  const [searchValue, setSearchValue] = useState("");

  if (isLoaded) {
    return <Skeleton />;
  }

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchValue }, (results, status) => {
      if (status === "OK" && results[0].geometry.location) {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
      } else {
        console.error("No se pudo encontrar la ubicación.");
      }
    });
  };

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="45vh"
        w="80vw">
        <Box>
          <Input
            placeholder="Buscar lugar de origen"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={handleSearch}>Buscar</Button>
          <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              zoom={10}
              center={center}
              onLoad={setMap}>
              <Marker position={center} />
              <Circle
                center={center}
                radius={radius}
                options={{
                  fillColor: "red",
                  fillOpacity: 0.2,
                  strokeColor: "red",
                  strokeOpacity: 1,
                }}
              />
            </GoogleMap>
          </LoadScript>
        </Box>
      </Flex>
    </>
  );
};

export default Map2;
