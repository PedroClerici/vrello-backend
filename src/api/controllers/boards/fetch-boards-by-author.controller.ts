import { type Request, type Response } from 'express';

import FetchBoardsByAuthorRequestDTO from '@/api/dtos/boards/fetch-boards-by/fetch-boards-by-author-request';
import FetchBoardsResponseDTO from '@/api/dtos/boards/fetch-boards-by/fetch-boards-response';
import FetchBoardsByAuthorService from '@/api/services/boards/fetch-boards-by-author.service';
import BoardsRepositoryMongoose from '@/api/repositories/mongoose/boards.repository';

const fetchBoardsByAuthor = async (request: Request, response: Response) => {
  const data = new FetchBoardsByAuthorRequestDTO({
    authorId: request.params.userId,
  });

  const boards = await new FetchBoardsByAuthorService(
    new BoardsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(boards.map((board) => new FetchBoardsResponseDTO(board).getAll()));
};

export default fetchBoardsByAuthor;
