import { Types, model, Schema } from 'mongoose';

export type List = {
  id: Types.ObjectId;
  title: string;
  board: Types.ObjectId;
};

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    board: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Board',
    },
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

export const ListModel = model<List>('List', listSchema);
