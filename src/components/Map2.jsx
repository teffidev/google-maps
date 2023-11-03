import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  Circle,
} from "@react-google-maps/api";

const center = { lat: 6.25184, lng: -75.56359 };
const libraries = ["places", "geometry"];

const Map2 = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const searchBox = useRef(null);

  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleMapLoad = (map) => {
    setMap(map);
  };

  const handlePlaceSelect = () => {
    const places = searchBox.current.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setOrigin(location);
    }
  };

  const clearOrigin = () => {
    setOrigin(null);
    setSearchValue("");
  };

  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="45vh"
        w="80vw">
        <Box position="absolute" left={"20%"} top={"20%"} h="100%" w="80%">
          {/* Google Map Box */}
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={10}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={handleMapLoad}>
            {origin && (
              <>
                <Marker position={center}></Marker>
                <Circle
                  center={origin}
                  radius={5000}
                  options={{
                    fillColor: "red",
                    fillOpacity: 0.2,
                    strokeColor: "red",
                    strokeOpacity: 1,
                    strokeWeight: 1,
                  }}
                />
              </>
            )}
          </GoogleMap>
        </Box>

        <Box
          p={2}
          m={2}
          borderRadius="lg"
          position="absolute"
          left={"35%"}
          top={"20%"}
          h="14%"
          bgColor="white"
          shadow="base"
          minW="container.md"
          zIndex="1">
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete
                onLoad={(autocomplete) => (searchBox.current = autocomplete)}>
                <Input
                  type="text"
                  ref={searchBox}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Autocomplete>
            </Box>

            <Box>
              <ButtonGroup>
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={handlePlaceSelect}>
                  Go
                </Button>
                <IconButton icon={<FaTimes />} onClick={clearOrigin} />
                <IconButton
                  icon={<FaLocationArrow />}
                  isRound
                  onClick={() => {
                    map.panTo(center);
                    map.setZoom(10);
                  }}
                />
              </ButtonGroup>
            </Box>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Map2;
