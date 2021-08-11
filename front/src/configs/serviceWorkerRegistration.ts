// This optional code is used to register a service worker.
// register() is not called by default.

// import { isLocalhost } from "../utils";

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://cra.link/PWA

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

// export let registration: ServiceWorkerRegistration | undefined = undefined

export function register(config?: Config) {
  if (!('serviceWorker' in navigator)) return Promise.reject('Navegador não suporta service workers')

  // The URL constructor is available in all browsers that support SW.
  const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
  if (publicUrl.origin !== window.location.origin) {
    // Our service worker won't work if PUBLIC_URL is on a different origin
    // from what our page is served on. This might happen if a CDN is used to
    // serve assets; see https://github.com/facebook/create-react-app/issues/2374
    return Promise.reject('URL publica diferente de URL de referência');
  }

  return new Promise<ServiceWorkerRegistration | undefined>((resolve, reject) => {
    window.addEventListener('load', async () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      // if (!isLocalhost) 
      return resolve(registerValidSW(swUrl, config));
      // const registration = await checkValidServiceWorker(swUrl, config)
      // navigator.serviceWorker.ready.then(() => {
      //   console.log(
      //     'This web app is being served cache-first by a service ' +
      //       'worker. To learn more, visit https://cra.link/PWA'
      //   );
      // }); 
      // return resolve(registration)
    });
  })
}

async function registerValidSW(swUrl: string, config?: Config): Promise<ServiceWorkerRegistration> {
  let registration: ServiceWorkerRegistration;
  try {
    registration = await navigator.serviceWorker.register(swUrl)
  } catch(error) {
    console.error('Error during service worker registration:', error);
    throw error
  }
  registration.onupdatefound = () => {
    const installingWorker = registration.installing;
    if (installingWorker == null) return;

    installingWorker.onstatechange = () => {
      if (installingWorker.state !== 'installed') return
      if (navigator.serviceWorker.controller) {
        // At this point, the updated precached content has been fetched,
        // but the previous service worker will still serve the older
        // content until all client tabs are closed.
        console.log(
          'New content is available and will be used when all ' +
            'tabs for this page are closed. See https://cra.link/PWA.'
        );

        // Execute callback
        if (config && config.onUpdate) {
          config.onUpdate(registration);
        }
      } else {
        // At this point, everything has been precached.
        // It's the perfect time to display a
        // "Content is cached for offline use." message.
        console.log('Content is cached for offline use.');

        // Execute callback
        if (config && config.onSuccess) {
          config.onSuccess(registration);
        }
      }
    };
  };
  return registration
}

// async function checkValidServiceWorker(swUrl: string, config?: Config) {
//   try {
//     const response = await fetch(swUrl, {
//       headers: { 'Service-Worker': 'script' },
//     })
//     const contentType = response.headers.get('content-type');
//     if (
//       response.status === 404 ||
//       (contentType != null && contentType.indexOf('javascript') === -1)
//     ) {
//       // No service worker found. Probably a different app. Reload the page.
//       navigator.serviceWorker.ready.then((registration) => {
//         registration.unregister().then(() => {
//           window.location.reload();
//         });
//       });
//     } else {
//       // Service worker found. Proceed as normal.
//       return registerValidSW(swUrl, config);
//     }
//   } catch (error) {
//     console.log('No internet connection found. App is running in offline mode.');
//     throw 'No internet connection found. App is running in offline mode.'
//   }
// }

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
