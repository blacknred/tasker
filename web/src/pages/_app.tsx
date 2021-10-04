import { ChakraProvider, ColorModeProvider, useToast } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import theme from '../theme';
import { fetcher, localStorageProvider } from '../utils';


//


const applicationServerPublicKey = 'BHdd2PwLOsYaDQQOmqw_8KIIYOQYECWN' +
  'lat0K8GScnytjV88e6Xifn0GMz7MbScAkxf_kVJhnp-0NrB_P4u6WHw';
const pushButton = document.querySelector('.js-push-btn');
let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function updateBtn() {
  if (Notification.permission === 'denied') {
    // pushButton.textContent = 'Push Messaging Blocked.';
    // pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    // return;
  }

  // if (isSubscribed) {
  //   pushButton.textContent = 'Disable Push Messaging';
  // } else {
  //   pushButton.textContent = 'Enable Push Messaging';
  // }

  // pushButton.disabled = false;
}

// function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  // const subscriptionJson = document.querySelector('.js-subscription-json');
  // const subscriptionDetails =
  //   document.querySelector('.js-subscription-details');

  // if (subscription) {
  //   subscriptionJson.textContent = JSON.stringify(subscription);
  //   subscriptionDetails.classList.remove('is-invisible');
  // } else {
  //   subscriptionDetails.classList.add('is-invisible');
  // }
// }

function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed.');

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}

function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}


function MyApp({ Component, pageProps }: AppProps) {
  const toast = useToast();

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log("Service Worker registration successful with scope: ", registration.scope);

          // pushButton.addEventListener('click', function() {
          //   // pushButton.disabled = true;
          //   if (isSubscribed) {
          //     unsubscribeUser();
          //   } else {
          //     subscribeUser();
          //   }
          // });

          // Set the initial subscription value
          registration.pushManager.getSubscription()
            .then(function (sub) {
              // isSubscribed = !(sub === null);

              updateSubscriptionOnServer(sub);

              // if (isSubscribed) {
              //   console.log('User IS subscribed.');
              // } else {
              //   console.log('User is NOT subscribed.');
              // }

              // updateBtn();
            });

        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    } else {
      console.warn('Push messaging is not supported');
    }
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


