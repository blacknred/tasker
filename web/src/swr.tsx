import { createStandaloneToast } from '@chakra-ui/react';
import { FC } from 'react';
import { SWRConfig } from 'swr';
import { fetcher, isServer, localStorageProvider, showToast } from './utils';

const Swr: FC<{}> = ({ children }) => (
  <>
    <SWRConfig value={{
      fetcher,
      provider: localStorageProvider,
      onLoadingSlow: () => {
        showToast({
          title: "Slow network.",
        })
      },
      isPaused: isServer,
      revalidateOnReconnect: true,
      loadingTimeout: 5000,
      onError: (error, key) => {
        if (error.status !== 403 && error.status !== 404) {
          showToast({
            title: "Network error.",
            description: error.message,
          })
        }
      }
    }}>
      {children}
    </SWRConfig>
  </>
)

export default Swr;