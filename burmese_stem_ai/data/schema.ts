import mongoose from "mongoose";
import { profileSchema } from "./schemas/profile.schema";
import { sessionSchema } from "./schemas/session.schema";

export const ProfileModel = mongoose.models.Profile ?? mongoose.model("Profile", profileSchema);
export const SessionModel = mongoose.models.Session ?? mongoose.model("Session", sessionSchema);
