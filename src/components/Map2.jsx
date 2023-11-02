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
} from "@react-google-maps/api";

const center = { lat: 6.25184, lng: -75.56359 };
const libraries = ["places", "geometry"];

const Map2 = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const originRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  async function calculateRoute() {
    if (originRef.current.value === "") {
      return;
    }

    const mapElement = document.getElementById("map");

    if (mapElement) {
      const geocoder = new window.google.maps.Geocoder();
      const address = originRef.current.value;

      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const location = results[0].geometry.location;
          const mapOptions = {
            center: location,
            zoom: 15,
          };

          const map = new window.google.maps.Map(
            document.getElementById("map"),
            mapOptions
          );

          if (map) {
            map.setMap(null);
          }

          new window.google.maps.Marker({
            position: location,
            map,
          });

          new window.google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            map,
            center: location,
            radius: 1000, // meters
          });
        } else {
          alert(
            "La geocodificación no tuvo éxito por el siguiente motivo: " +
              status
          );
        }
      });
    } else {
      console.error("Elemento con ID 'map' no fue encotrado");
    }
  }

  function clearRoute() {
    console.log("Clearing route");
    originRef.current.value = "";
  }

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
            center={center}
            mapContainerStyle={{ height: "100%", width: "100%" }}
            zoom={10}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={(map) => setMap(map)}>
            <Marker position={center}></Marker>
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
              <Autocomplete>
                <Input type="text" ref={originRef} />
              </Autocomplete>
            </Box>

            <Box>
              <ButtonGroup>
                <Button
                  colorScheme="blue"
                  type="submit"
                  onClick={calculateRoute}>
                  Go
                </Button>
                <IconButton
                  icon={<FaTimes />}
                  // colorScheme="teal"
                  onClick={clearRoute}
                />
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
