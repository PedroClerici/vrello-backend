import { type Types, Schema, model } from 'mongoose';

export type Board = {
  id: Types.ObjectId;
  author: Types.ObjectId;
  description: string;
  visibility: string;
};

enum Visibility {
  public,
  private,
}

const boardSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    description: { type: String },
    visibility: { type: String, enum: Visibility },
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

export const BoardModel = model<Board>('Board', boardSchema);
