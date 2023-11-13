import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";

const center = { lat: 4.60971, lng: -74.08175 };

const Map1 = () => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    console.log("Directions Response:", results);
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    console.log("Clearing route");
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <>
      <Flex position="relative" alignItems="center" h="50vh" w="80vw">
        <Box
          p={2}
          m={2}
          borderRadius="lg"
          bgColor="white"
          shadow="base"
          zIndex="1">
          <HStack>
            <HStack>
              <Box>
                <Autocomplete>
                  <Input
                    id="origin-ref"
                    type="text"
                    placeholder="Moving From"
                    ref={originRef}
                  />
                </Autocomplete>
              </Box>
              <Box flexGrow={1}>
                <Autocomplete>
                  <Input
                    id="destination-ref"
                    type="text"
                    placeholder="Moving To"
                    ref={destiantionRef}
                  />
                </Autocomplete>
              </Box>
              <ButtonGroup>
                <Box p={2} m={2}>
                  <Button
                    colorScheme="cyan"
                    type="submit"
                    onClick={calculateRoute}>
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
                      map.panTo(center);
                      map.setZoom(10);
                    }}
                  />
                </Box>
              </ButtonGroup>
            </HStack>
            <HStack spacing={16} ml={2} mr={16} justifyContent="space-between">
              <Text>Distance: {distance} </Text>
              <Text>Duration: {duration} </Text>
            </HStack>
          </HStack>
          <HStack>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              center={center}
              zoom={10}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={(map) => {
                setMap(map);
              }}>
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </HStack>
        </Box>
      </Flex>
    </>
  );
};

export default Map1;
