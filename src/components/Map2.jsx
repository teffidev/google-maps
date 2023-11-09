import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  Autocomplete,
} from "@react-google-maps/api";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  Input,
  Button,
  Flex,
  Box,
  HStack,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";

const Map2 = () => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 6.25184, lng: -75.56359 });

  const [searchValue, setSearchValue] = useState("");

  const radius = 500;

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

  const clearRoute = () => {
    setSearchValue("");
  };

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="45vh"
        w="100%">
        <Box
          p={2}
          m={2}
          borderRadius="lg"
          bgColor="white"
          shadow="base"
          zIndex="1">
          <HStack>
            <Box>
              <Autocomplete>
                <Input
                  id="search-value"
                  placeholder="Find location"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Autocomplete>
            </Box>
            <ButtonGroup>
              <Button colorScheme="cyan" type="submit" onClick={handleSearch}>
                Go
              </Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
              <IconButton
                aria-label="center back"
                icon={<FaLocationArrow />}
                isRound
                onClick={() => {
                  setCenter({ lat: 6.25184, lng: -75.56359 });
                  map.setZoom(10);
                }}
              />
            </ButtonGroup>
          </HStack>
          <HStack>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                zoom={10}
                center={center}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
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
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Map2;
