import jwt from "jsonwebtoken";
import { SECRET_KEY, TOKEN_EXPIRE_IN } from "../config/config.js";

const generateAuthToken = (
    tokenPayload,
    tokenExpiryDuration = TOKEN_EXPIRE_IN
) => {
    const authToken = jwt.sign(tokenPayload, SECRET_KEY, {
        expiresIn: tokenExpiryDuration,
    });
    return authToken;
};

export default generateAuthToken;
