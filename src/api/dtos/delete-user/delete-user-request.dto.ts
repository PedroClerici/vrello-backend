import z from 'zod';
import { isValidObjectId } from 'mongoose';

import AbstractDTO from '../abstract.dto';

const deleteUserRequestSchema = z.object({
  id: z.string().refine((id) => isValidObjectId(id)),
});

class DeleteUserRequestDTO extends AbstractDTO<typeof deleteUserRequestSchema> {
  protected rules() {
    return deleteUserRequestSchema;
  }
}

export default DeleteUserRequestDTO;
