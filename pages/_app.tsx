import type {AppProps} from 'next/app'
import {ChakraProvider} from "@chakra-ui/react"
import Head from 'next/head'
import {initializeApp, getApps} from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCa1eYyHyqHHoedBTOiyvtD9KrdOlQFxPk",
    authDomain: "group-wallet-322906.firebaseapp.com",
    projectId: "group-wallet-322906",
    storageBucket: "group-wallet-322906.appspot.com",
    messagingSenderId: "226773022283",
    appId: "1:226773022283:web:4577159afac2b091987fce",
};

if (getApps().length === 0) {
    initializeApp(firebaseConfig);
}

function MyApp({Component, pageProps}: AppProps) {
    return <div>
        <Head>
            <title>Group Wallet</title>
            <meta name="description" content="Group Wallet"/>
        </Head>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    </div>
}

export default MyApp
