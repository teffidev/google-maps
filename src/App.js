import React from "react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/react";
import Map1 from "./components/Map1";
import Map2 from "./components/Map2";

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={4}>
        <Map1 />
        <Map2 />
      </Box>
    </ChakraProvider>
  );
}

export default App;
