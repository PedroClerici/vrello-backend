import { Types, model, Schema } from 'mongoose';

export enum Colors {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
  Purple = 'purple',
  Yellow = 'yellow',
}

export type Tag = {
  name: string;
  color: Colors;
};

export type Card = {
  id: Types.ObjectId;
  title: string;
  description?: string;
  tags?: Tag[];
  list: Types.ObjectId;
  board: Types.ObjectId;
};

const tagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, enum: Colors, required: true },
});

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tags: [tagSchema],
    list: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'List',
    },
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

export const CardModel = model<Card>('Card', cardSchema);
