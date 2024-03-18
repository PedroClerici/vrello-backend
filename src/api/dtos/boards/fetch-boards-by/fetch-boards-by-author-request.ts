import { z } from 'zod';
import { isValidObjectId } from 'mongoose';

import AbstractDTO from '@/api/dtos/abstract.dto';

const fetchBoardsResponseSchema = z.object({
  authorId: z.string().refine((id) => isValidObjectId(id)),
});

class FetchBoardsByAuthorRequestDTO extends AbstractDTO<
  typeof fetchBoardsResponseSchema
> {
  protected rules() {
    return fetchBoardsResponseSchema;
  }
}

export default FetchBoardsByAuthorRequestDTO;
