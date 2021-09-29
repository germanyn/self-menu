import { clearDatabase, closeDatabase, connect } from "./setupTest"

export function hooksDeDatabase() {
	beforeAll(async () => {
		connect()
	})

	afterEach(async () => {
		clearDatabase()
	})

	afterAll(async () => {
		closeDatabase()
	})
}