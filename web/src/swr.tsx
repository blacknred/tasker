import { FC } from 'react';
import { SWRConfig } from 'swr';
import { fetcher, isServer, localStorageProvider, logger, showToast } from './utils';

const Swr: FC<{}> = ({ children }) => (
  <>
    <SWRConfig value={{
      fetcher,
      // provider: localStorageProvider,
      // isPaused: isServer,
      revalidateOnReconnect: true,
      loadingTimeout: 10000,
      onLoadingSlow: () => {
        showToast({
          title: "Slow network",
        })
      },
      // use: [logger],
      onError: (error) => {
        showToast({
          title: "Network error",
          description: error.message,
        })
      }
    }}>
      {children}
    </SWRConfig>
  </>
)

export default Swr;