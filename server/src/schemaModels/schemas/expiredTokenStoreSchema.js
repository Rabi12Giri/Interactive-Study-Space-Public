import { Schema } from "mongoose";

const expiredTokenStoreSchema = new Schema(
    {
        token: {
            type: String,
            required: [true, "Token is required"],
        },
    },
    { timestamps: true }
);

export default expiredTokenStoreSchema;
