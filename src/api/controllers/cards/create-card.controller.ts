import { type Request, type Response } from 'express';

import CreateCardRequestDTO from '@/api/dtos/cards/create-card/create-card-request.dto';
import CreateCardResponseDTO from '@/api/dtos/cards/create-card/create-card-response.dto';
import CreateCardService from '@/api/services/cards/create-card.service';
import CardsRepositoryMongoose from '@/api/repositories/mongoose/cards.repository';

const createCard = async (request: Request, response: Response) => {
  const data = new CreateCardRequestDTO({
    ...request.body,
    list: request.params.listId,
    board: request.params.boardId,
  });

  const card = await new CreateCardService(
    new CardsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new CreateCardResponseDTO(card).getAll());
};

export default createCard;
