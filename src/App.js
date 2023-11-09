import { useLoadScript } from "@react-google-maps/api";
import { ChakraProvider, CSSReset, Box, Skeleton } from "@chakra-ui/react";
import Map1 from "./components/Map1";
import Map2 from "./components/Map2";

const libraries = ["places"];

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <Skeleton />;
  }

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        {isLoaded && <Map1 />}
        {isLoaded && <Map2 />}
      </Box>
    </ChakraProvider>
  );
}

export default App;
