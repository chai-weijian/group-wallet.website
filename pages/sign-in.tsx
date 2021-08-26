import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import type { NextPage } from "next";
import { Link } from "../components/login/Link";
import { Card } from "../components/Card";
import { LoginForm } from "../components/login/LoginForm";
import { DividerWithText } from "../components/login/DividerWithText";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SocialMediaLogin } from "../components/login/SocialMediaLogin";

const SignIn: NextPage = () => {
  const router = useRouter();

  const signIn = ({ email, password }: { email: string; password: string }) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
          Sign in to your account
        </Heading>
        <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
          <Text as="span">Don&apos;t have an account?</Text>
          <NextLink href={{ pathname: "/sign-up" }} passHref>
            <Link>Sign up now</Link>
          </NextLink>
        </Text>
        <Card>
          <LoginForm onSubmit={signIn} submitButtonLabel={`Sign In`} />
          <DividerWithText mt="6">or continue with</DividerWithText>
          <SocialMediaLogin />
        </Card>
      </Box>
    </Box>
  );
};

export default SignIn;
