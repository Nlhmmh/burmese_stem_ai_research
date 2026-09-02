import "dotenv/config";

import mongoose from "mongoose";
import { ProfileModel, SessionModel } from "./schema.js";

async function clearDatabase() {
  await Promise.all([ProfileModel.deleteMany({}), SessionModel.deleteMany({})]);
  console.log("Cleared Profiles and Sessions collections");
}

async function synchronizeIndexes() {
  const removedProfileIndexes = await ProfileModel.syncIndexes();
  const removedSessionIndexes = await SessionModel.syncIndexes();
  console.log("Removed obsolete profile indexes:", removedProfileIndexes);
  console.log("Removed obsolete session indexes:", removedSessionIndexes);
}

async function main() {
  const databaseUrl = process.env.DB_URL;
  if (!databaseUrl) {
    throw new Error("DB_URL environment variable is required");
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(databaseUrl);
    await clearDatabase();
    await synchronizeIndexes();
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

void main();
