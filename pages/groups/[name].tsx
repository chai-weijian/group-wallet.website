import { NextPage } from "next";
import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";
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
      <Box maxW="2xl" mx="auto">
        <Text>Owner: {group?.owner}</Text>
        <Text mt={3}>Members:</Text>
        <UnorderedList>
          {group?.members?.map((member) => (
            <ListItem key={member}>{member}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default GroupDetail;
