import React, { useRef, useState } from "react";
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

  const radius = 5000;
  const originRef = useRef();

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
    originRef.current.value = "";
  };

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="45vh"
        w="80vw">
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
                  placeholder="Buscar lugar de origen"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Autocomplete>
            </Box>
            <ButtonGroup>
              <Button onClick={handleSearch}>Buscar</Button>
              <IconButton
                aria-label="center back"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>
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
        </Box>
      </Flex>
    </>
  );
};

export default Map2;
