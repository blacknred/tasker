import { ChakraProvider, ColorModeProvider, useToast } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import theme from '../theme';
import { localStorageProvider } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {
  const toast = useToast();

  return (
    <SWRConfig value={{
      // refreshInterval: 3000,
      provider: localStorageProvider,
      fetcher: (res, init) => fetch(res, init).then(res => res.json()),
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


