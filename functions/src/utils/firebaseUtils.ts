import * as functions from 'firebase-functions'

export function configFirebaseEnviroment() {
	const config = functions.config()
	if (config.env)
		Object.entries<string>(functions.config().env).forEach(([key, value]: [string, string]) => {
			process.env[key.toUpperCase()] = value
		})
}
