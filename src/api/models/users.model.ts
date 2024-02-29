/* eslint-disable no-param-reassign */
import { type Types, Schema, model } from 'mongoose';

export type User = {
  id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
};

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, require: true },
  },
  {
    versionKey: false,
    toObject: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

const UserModel = model<User>('User', userSchema);

export default UserModel;
