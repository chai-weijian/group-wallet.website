import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import CompleteProfileAlert from "../components/profile/CompleteProfileAlert";

const Home: NextPage = () => {
  return (
    <>
      <CompleteProfileAlert />
      <Box as="section">
        <Box
          maxW="2xl"
          mx="auto"
          px={{ base: "6", lg: "8" }}
          py={{ base: "16", sm: "20" }}
          textAlign="center"
        >
          <Heading
            as="h2"
            size="3xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Welcome Home
          </Heading>
        </Box>
      </Box>
    </>
  );
};

export default Home;
