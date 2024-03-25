import { type Request, type Response } from 'express';

import FetchCardsByListRequestDTO from '@/api/dtos/cards/fetch-cards-by/fetch-cards-by-list-request';
import FetchCardsResponseDTO from '@/api/dtos/cards/fetch-cards-by/fetch-cards-response';
import FetchCardsByListService from '@/api/services/cards/fetch-cards-by-list.service';
import CardsRepositoryMongoose from '@/api/repositories/mongoose/cards.repository';

const fetchCardsByList = async (request: Request, response: Response) => {
  const data = new FetchCardsByListRequestDTO({
    board: request.params.boardId,
    list: request.params.listId,
  });

  const cards = await new FetchCardsByListService(
    new CardsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(cards.map((lists) => new FetchCardsResponseDTO(lists).getAll()));
};

export default fetchCardsByList;
