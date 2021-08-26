import { Alert, AlertIcon, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useUser } from "../../lib/hooks/useUser";

const CompleteProfileAlert = () => {
  const { userState } = useUser();

  if (userState === "INCOMPLETE_PROFILE") {
    return (
      <Alert status="warning">
        <AlertIcon />
        <Text>
          To continue using this app, please{" "}
          <NextLink href={{ pathname: `/profile` }} passHref>
            <Link color="teal.500" as="a">
              complete your profile
            </Link>
          </NextLink>{" "}
          first.
        </Text>
      </Alert>
    );
  }

  return null;
};

export default CompleteProfileAlert;
