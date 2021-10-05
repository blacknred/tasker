import { ChakraProvider, ColorModeProvider, useToast } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import pushService from '../push';
import '../styles/globals.css';
import theme from '../theme';
import { fetcher } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {
  const toast = useToast();

  useEffect(() => {
    pushService.init("/sw.js");
  }, [])

  return (
    <SWRConfig value={{
      fetcher,
      // provider: localStorageProvider,
      onLoadingSlow: () => {
        toast({
          title: "Slow network.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
      },
      onError: (error, key) => {
        if (error.status !== 403 && error.status !== 404) {
          toast({
            title: "Network error.",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          })
        }
      }
    }}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: false,
            initialColorMode: 'light'
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </SWRConfig>
  )
}

export default MyApp


