import { type InferSchemaType, Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, require: true, select: false },
  },
  { versionKey: false },
);

export type User = InferSchemaType<typeof userSchema>;

const UserModel = model<User>('User', userSchema);

export default UserModel;
