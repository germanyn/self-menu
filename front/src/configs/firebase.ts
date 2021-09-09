import firebase from 'firebase/app'
require('firebase/messaging')

export const firebaseConfig = {
    apiKey: "AIzaSyDQAAWR5Kr9LgV5LUO6yyUm5FpdmRhmViA",
    authDomain: "self-menu.firebaseapp.com",
    projectId: "self-menu",
    storageBucket: "self-menu.appspot.com",
    messagingSenderId: "87652739809",
    appId: "1:87652739809:web:ec90acbaa94e4c094025a0",
    measurementId: "G-HYGVS4DWH9"
};

const firebaseApp = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

let messaging: firebase.messaging.Messaging | null = null

try {
  messaging = firebaseApp.messaging();
} catch (error) {
  console.error('Não foi possível inicializar', error)
}

export {
    messaging,
}

export const onMessageListener = () =>
  new Promise<any>((resolve) => {
    messaging?.onMessage((payload) => {
      resolve(payload);
    })
})
