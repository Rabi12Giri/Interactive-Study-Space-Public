import mongoose from "mongoose";
import userSchema from "./schemas/userSchema.js";
import expiredTokenStoreSchema from "./schemas/expiredTokenStoreSchema.js";

export const User = mongoose.model("User", userSchema);
export const ExpiredTokenStore = mongoose.model(
    "ExpiredTokenStore",
    expiredTokenStoreSchema
);
