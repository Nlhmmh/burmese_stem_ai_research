import mongoose from "mongoose";
import { profileSchema } from "./schemas/profile.schema";
import { sessionSchema } from "./schemas/session.schema";

function registerModel(name: string, schema: mongoose.Schema) {
  const existingModel = mongoose.models[name];

  // Next.js preserves Mongoose's global model registry during development.
  // Recompile when a hot reload provides an updated schema definition.
  if (existingModel && process.env.NODE_ENV === "development" && existingModel.schema !== schema) {
    mongoose.deleteModel(name);
  }

  return mongoose.models[name] ?? mongoose.model(name, schema);
}

export const ProfileModel = registerModel("Profile", profileSchema);
export const SessionModel = registerModel("Session", sessionSchema);
