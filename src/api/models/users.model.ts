import { type InferSchemaType, Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

type User = InferSchemaType<typeof UserSchema>;

const UserModel = model<User>('user', UserSchema);

export default UserModel;
