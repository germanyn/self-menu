export function register() {
    if (!('serviceWorker' in navigator)) return

    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
        // Our service worker won't work if PUBLIC_URL is on a different origin
        // from what our page is served on. This might happen if a CDN is used to
        // serve assets; see https://github.com/facebook/create-react-app/issues/2374
        return;
    }

    return new Promise<ServiceWorkerRegistration | undefined>((resolve, reject) => {
        window.addEventListener('load', async () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            // if (!isLocalhost) 
            return resolve(registerValidSW(swUrl));
            // const registration = await checkValidServiceWorker(swUrl, config)
            // navigator.serviceWorker.ready.then(() => {
            //     console.log(
            //     'This web app is being served cache-first by a service ' +
            //         'worker. To learn more, visit https://cra.link/PWA'
            //     );
            // }); 
            // return resolve(registration)
        });
    })
}

async function registerValidSW(swUrl: string): Promise<ServiceWorkerRegistration> {
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
        } else {
            // At this point, everything has been precached.
            // It's the perfect time to display a
            // "Content is cached for offline use." message.
            console.log('Content is cached for offline use.');
        }
        };
    };
    return registration
}

async function checkValidServiceWorker(swUrl: string) {
    try {
        const response = await fetch(swUrl, {
            headers: { 'Service-Worker': 'script' },
        })
        const contentType = response.headers.get('content-type');
        if (
            response.status === 404 ||
            (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
            // No service worker found. Probably a different app. Reload the page.
            navigator.serviceWorker.ready.then((registration) => {
                registration.unregister().then(() => {
                window.location.reload();
                });
            });
        } else {
            // Service worker found. Proceed as normal.
            return registerValidSW(swUrl);
        }
    } catch (error) {
        console.log('No internet connection found. App is running in offline mode.');
        throw 'No internet connection found. App is running in offline mode.'
    }
}

export async function unregister() {
    if (!('serviceWorker' in navigator)) return
    try {
        const registration = await navigator.serviceWorker.ready
        registration.unregister();
    } catch(error) {
        console.error(error.message);
    }
}
  