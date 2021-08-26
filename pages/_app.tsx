import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Group Wallet</title>
        <meta name="description" content="Group Wallet" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </div>
  );
}

export default MyApp;
