import type {NextPage} from 'next'
import {Box, Button, Heading} from '@chakra-ui/react'
import Link from 'next/link';

const Home: NextPage = () => {
    return <Box as="section">
        <Box
            maxW="2xl"
            mx="auto"
            px={{base: '6', lg: '8'}}
            py={{base: '16', sm: '20'}}
            textAlign="center"
        >
            <Heading as="h2" size="3xl" fontWeight="extrabold" letterSpacing="tight">
                Ready to try?
            </Heading>
            <Link href={`/sign-in`} passHref>
                <Button mt="8" as="a" size="lg" colorScheme="blue" fontWeight="bold">
                    Sign up
                </Button>
            </Link>
        </Box>
    </Box>
}

export default Home
