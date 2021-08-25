import {
    Box,
    Button,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react'
import * as React from 'react'
import {FaFacebook, FaGoogle, FaTwitter} from 'react-icons/fa'
import type {NextPage} from 'next';
import {Link} from "../components/login/Link";
import {Card} from "../components/login/Card";
import {LoginForm} from "../components/login/LoginForm";
import {DividerWithText} from "../components/login/DividerWithText";
import NextLink from 'next/link'

const SignIn: NextPage = () => {
    return <Box
        bg={useColorModeValue('gray.50', 'inherit')}
        minH="100vh"
        py="12"
        px={{ base: '4', lg: '8' }}
    >
        <Box maxW="md" mx="auto">
            <Heading textAlign="center" size="xl" fontWeight="extrabold">
                Sign in to your account
            </Heading>
            <Text mt="4" mb="8" align="center" maxW="md" fontWeight="medium">
                <Text as="span">Don&apos;t have an account?</Text>
                <NextLink href={{pathname: '/sign-up'}} passHref>
                    <Link>Sign up now</Link>
                </NextLink>
            </Text>
            <Card>
                <LoginForm submitButtonLabel={`Sign In`} />
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

export default SignIn
