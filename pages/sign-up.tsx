import {NextPage} from "next";
import {Box, Button, Heading, SimpleGrid, Text, useColorModeValue, VisuallyHidden} from "@chakra-ui/react";
import {Link} from "../components/login/Link";
import {Card} from "../components/login/Card";
import {LoginForm} from "../components/login/LoginForm";
import * as React from "react";
import NextLink from "next/link";
import {DividerWithText} from "../components/login/DividerWithText";
import {FaFacebook, FaGoogle, FaTwitter} from "react-icons/fa";

const SignUp: NextPage = () => {
    return <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}
    >
        <Box maxW="md" mx="auto">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign up a new account
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">Already have an account?</Text>
                <NextLink href={{pathname: '/sign-in'}} passHref>
                    <Link>Sign in now</Link>
                </NextLink>
            </Text>
            <Card>
                <LoginForm submitButtonLabel={`Sign Up`} />
                <DividerWithText mt="6">or continue with</DividerWithText>
                <SimpleGrid mt="6" columns={3} spacing="3">
                    <Button disabled color="currentColor" variant="outline">
                        <VisuallyHidden>Login with Facebook</VisuallyHidden>
                        <FaFacebook />
                    </Button>
                    <Button color="currentColor" variant="outline">
                        <VisuallyHidden>Login with Google</VisuallyHidden>
                        <FaGoogle />
                    </Button>
                    <Button disabled color="currentColor" variant="outline">
                        <VisuallyHidden>Login with Twitter</VisuallyHidden>
                        <FaTwitter />
                    </Button>
                </SimpleGrid>
            </Card>
        </Box>
    </Box>
}

export default SignUp