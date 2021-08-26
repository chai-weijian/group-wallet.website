import type { NextPage } from "next";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import CompleteProfileAlert from "../components/profile/CompleteProfileAlert";
import { useUser } from "../lib/hooks/useUser";
import NextLink from "next/link";
import * as React from "react";
import { RowItem } from "../components/group/RowItem";

const Home: NextPage = () => {
  const { user } = useUser();

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
            Welcome, {user?.displayName}
          </Heading>
        </Box>
        <Box
          maxW="2xl"
          mx="auto"
          px={{ base: "6", lg: "8" }}
          py={{ base: "1", sm: "2" }}
        >
          <Flex
            align="center"
            justify="space-between"
            px="6"
            py="4"
            borderBottomWidth="1px"
          >
            <Heading as="h2" fontSize="lg">
              Groups
            </Heading>
            <NextLink href={`/groups/create`} passHref>
              <Button size={`sm`} colorScheme="green" variant="outline">
                create
              </Button>
            </NextLink>
          </Flex>
          <VStack
            divider={<StackDivider borderColor="gray.200" />}
            spacing={2}
            align="stretch"
          >
            {user?.groups ? (
              user.groups.map((group) => <RowItem key={group} name={group} />)
            ) : (
              <NoGroup />
            )}
          </VStack>
        </Box>
      </Box>
    </>
  );
};

const NoGroup = () => {
  return (
    <Box>
      <Text>
        You have not join any group yet.{" "}
        <NextLink href={{ pathname: `/groups/create` }} passHref>
          <Link color="teal.500" as="a">
            Create a new group.
          </Link>
        </NextLink>
      </Text>
    </Box>
  );
};

export default Home;
