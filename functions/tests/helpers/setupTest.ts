import { Connection, ConnectOptions } from 'mongoose';
import mongoose = require('mongoose')
import { setupServer } from '../../src/infraestrutura/server'
import request, { SuperTest, Test } from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server'

process.env.NODE_ENV = 'test';

let mongod: MongoMemoryServer

export async function connect() {
    // if (mongod.state === '')
    mongod = new MongoMemoryServer()
    await mongod.start()
    const mongoUri = mongod.getUri();
    const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    };

    
    await mongoose.connect(mongoUri, options)
    // return new Promise(async (resolve, reject) => {
    //     mongoose.connection
    //         .on('error', (error) => reject(error))
    //         .on('open', () => resolve(mongoose.connection))
    // })
}

export async function clearDatabase() {
    await Promise.all(
        Object.values(mongoose.connection.collections)
            .map(collection => collection.deleteMany({}))
    )
}

export async function closeDatabase() {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

export async function restartServer() {
    return setupServer().then(([server, app]) => request(app))
        // new Promise<string>(resolve => app.listen(PORT, () => resolve(`http://localhost:${PORT}${server.graphqlPath}`)))
}