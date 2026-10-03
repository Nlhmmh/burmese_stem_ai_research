import mongoose from "mongoose";
import { afterAll } from "vitest";

const testMongoUri = process.env.TEST_MONGODB_URI;

if (!testMongoUri) {
  throw new Error("TEST_MONGODB_URI is required for MongoDB integration tests");
}

const databaseName = new URL(testMongoUri).pathname.slice(1).split("?")[0];
if (!databaseName.endsWith("_test")) {
  throw new Error("MongoDB integration tests require a database name ending in _test");
}

process.env.DB_URL = testMongoUri;

afterAll(async () => {
  await mongoose.disconnect();
});
