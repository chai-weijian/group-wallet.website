import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import { buildUrlString } from "../../lib/buildUrlString";
import StatusCode from "../../config/statusCode";
import { Alert, AlertIcon, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const CompleteProfileAlert = () => {
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      fetch(
        buildUrlString(`http://localhost:8080/v1/users:findUser`, {
          uid: user.uid,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      ).then(async (res) => {
        if (res.ok) {
          console.log(await res.json());
        } else {
          const status = await res.json();
          if (status.code === StatusCode.NOT_FOUND) {
          }
        }
      });
    }
  }, []);

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
};

export default CompleteProfileAlert;
