import { type InferSchemaType, Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, require: true, select: false },
});

export type User = InferSchemaType<typeof UserSchema>;

const UserModel = model<User>('user', UserSchema);

export default UserModel;
