import mongoose from "mongoose";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache: MongooseCache = globalWithMongoose.mongooseCache ?? {
  connection: null,
  promise: null
};

globalWithMongoose.mongooseCache = cache;

export async function connectMongoDB(): Promise<typeof mongoose> {
  if (cache.connection) {
    return cache.connection;
  }

  if (!cache.promise) {
    const databaseUrl = process.env.DB_URL;
    if (!databaseUrl) {
      throw new Error("DB_URL environment variable is required");
    }

    cache.promise = mongoose.connect(databaseUrl, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    });
  }

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    // Allow a later request to retry after a failed connection.
    cache.promise = null;
    throw error;
  }
}
