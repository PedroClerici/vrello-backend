import { type InferSchemaType, model, Schema } from 'mongoose';

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
  { timestamps: true, versionKey: false },
);

export type Board = InferSchemaType<typeof boardSchema>;

export const BoardModel = model('Board', boardSchema);
