import { string } from "joi";
import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isUserVerified: boolean;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
  email: { type: String, unquie: true },
  password: { type: String },
  isUserVerified: { type: Boolean, default: false }, // 검증되었는가?
});

export default model<IUser>("User", UserSchema);
