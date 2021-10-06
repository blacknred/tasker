import { useToast } from '@chakra-ui/react';
import { FC } from 'react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { fetcher } from './utils';

const Swr: FC<{}> = ({ children }) => {
  const toast = useToast();

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
      {children}
    </SWRConfig>
  )
}

export default Swr;