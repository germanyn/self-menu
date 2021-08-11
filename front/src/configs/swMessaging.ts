declare var self: ServiceWorkerGlobalScope

interface MessagePayload {
    notification: {
        title: string
        body: string
    }
}

interface FirebaseMessagingOptions { }

export default (
    firebase: firebase.default.app.App,
    options?: FirebaseMessagingOptions
) => {
    const messaging =  firebase.messaging()
    messaging.onBackgroundMessage((payload) => {
        console.log('payload', payload)
        if (!payload.notification) return

        const notificationTitle = payload.notification.title || ''
        const notificationOptions: NotificationOptions = {
            body: payload.notification.body,
        }
    
        self.registration.showNotification(
            notificationTitle,
            notificationOptions
        )
    })

    self.addEventListener('notificationclick', event => {
        event.notification.close()
        console.log(event)
    })

    self.addEventListener('notificationclose', event => {
        console.log(event)
    })
}
