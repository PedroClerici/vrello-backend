import { type InferSchemaType, model, Schema } from 'mongoose';

enum Colors {
  red,
  green,
  blue,
  purple,
  yellow,
}

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
  { timestamps: true, versionKey: false },
);

export type Card = InferSchemaType<typeof cardSchema>;

export const CardModel = model('List', cardSchema);
