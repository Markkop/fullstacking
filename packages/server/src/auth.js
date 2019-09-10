import jwt from "jsonwebtoken";
import User from "./modules/user/UserModel";

export async function getUser(token) {
  if (!token) return { currentUser: null };
  // console.log("Token itself: ", token.split(" ")[2]);
  try {
    const decodedToken = jwt.verify(token.split(" ")[2], "secret_key");
    const currentUser = await User.findOne({ _id: decodedToken.id });

    return {
      currentUser
    };
  } catch (err) {
    console.log("JWT Error: ", err.name);
    return { currentUser: null };
  }
}

export function generateToken(user) {
  return `JWT ${jwt.sign({ id: user._id }, "secret_key")}`;
}
