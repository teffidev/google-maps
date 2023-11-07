import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, Circle } from "@react-google-maps/api";
import { Input, Button, Flex, Box } from "@chakra-ui/react";

const Map2 = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [radius, setRadius] = useState(5000); // Radio en metros
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    // eslint-disable-next-line no-undef
    const geocoder = new google.maps.Geocoder();
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
