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
  isUserVerified: { type: Boolean, default: false }, // 검증확인
});

export default model<IUser>("User", UserSchema);

/**
 * 사용자가 작성한 스키마를 기준으로 데이터를 DB에 넣기 전에 먼저 검사
 */
