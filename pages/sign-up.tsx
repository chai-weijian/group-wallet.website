import { NextPage } from "next";
import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "../components/login/Link";
import { Card } from "../components/Card";
import { LoginForm } from "../components/login/LoginForm";
import * as React from "react";
import NextLink from "next/link";
import { DividerWithText } from "../components/login/DividerWithText";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { SocialMediaLogin } from "../components/login/SocialMediaLogin";

const SignUp: NextPage = () => {
  const router = useRouter();

  const signUp = ({ email, password }: { email: string; password: string }) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.push("/home").catch((err) => console.log(err));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign up a new account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Already have an account?</Text>
          <NextLink href={{ pathname: "/sign-in" }} passHref>
            <Link>Sign in now</Link>
          </NextLink>
        </Text>
        <Card>
          <LoginForm onSubmit={signUp} submitButtonLabel={`Sign Up`} />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SocialMediaLogin />
        </Card>
      </Box>
    </Box>
  );
};

export default SignUp;
