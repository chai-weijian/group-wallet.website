import { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useGroup } from "../../lib/hooks/useGroup";
import { liftType } from "../../lib/liftType";

const GroupDetail: NextPage = () => {
  const router = useRouter();

  const { group } = useGroup(`groups/${liftType(router.query.name)[0]}`);
  return (
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
          {group?.displayName}
        </Heading>
      </Box>
    </Box>
  );
};

export default GroupDetail;
