import { type InferSchemaType, model, Schema } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    board: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Board',
    },
  },
  { timestamps: true, versionKey: false },
);

export type List = InferSchemaType<typeof listSchema>;

export const ListModel = model('List', listSchema);
