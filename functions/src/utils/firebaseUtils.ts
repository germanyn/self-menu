import * as functions from 'firebase-functions'
import admin from 'firebase-admin'

export function configFirebaseEnviroment() {
	const config = functions.config()
	if (config.env)
		Object.entries<string>(functions.config().env).forEach(([key, value]: [string, string]) => {
			process.env[key.toUpperCase()] = value
		})
}

export function initFirebaseApp() {
	if (admin.apps.length) return
	admin.initializeApp({
		credential: admin.credential.applicationDefault(),
	})
}
