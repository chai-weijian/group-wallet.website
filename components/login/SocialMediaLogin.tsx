import { Button, SimpleGrid, useToast, VisuallyHidden } from "@chakra-ui/react";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import * as React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

export const SocialMediaLogin = () => {
  const router = useRouter();
  const toast = useToast();

  const googleLogin = () => login(new GoogleAuthProvider());

  const login = (provider: GoogleAuthProvider) => {
    signInWithPopup(getAuth(), provider)
      .then(() => {
        router.push("/home").catch((err) => console.log(err));
      })
      .catch(() => {
        toast({
          title: "Failed to sign in.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      });
  };

  return (
    <SimpleGrid mt="6" columns={3} spacing="3">
      <Button colorScheme="facebook" disabled variant="outline">
        <VisuallyHidden>Login with Facebook</VisuallyHidden>
        <FaFacebook />
      </Button>
      <Button color="currentColor" variant="outline" onClick={googleLogin}>
        <VisuallyHidden>Login with Google</VisuallyHidden>
        <FaGoogle />
      </Button>
      <Button colorScheme="twitter" disabled variant="outline">
        <VisuallyHidden>Login with Twitter</VisuallyHidden>
        <FaTwitter />
      </Button>
    </SimpleGrid>
  );
};
