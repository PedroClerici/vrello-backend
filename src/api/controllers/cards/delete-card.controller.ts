import { type Request, type Response } from 'express';

import DeleteCardRequestDTO from '@/api/dtos/cards/delete-card/delete-card-request.dto';
import CreateCardResponseDTO from '@/api/dtos/cards/create-card/create-card-response.dto';
import DeleteCardService from '@/api/services/cards/delete-card.service';
import CardsRepositoryMongoose from '@/api/repositories/mongoose/cards.repository';

const deleteCard = async (request: Request, response: Response) => {
  const data = new DeleteCardRequestDTO({
    id: request.params.listId,
    ...request.body,
  });

  const listDeleted = await new DeleteCardService(
    new CardsRepositoryMongoose(),
  ).execute(data);

  return response
    .status(200)
    .json(new CreateCardResponseDTO(listDeleted).getAll());
};

export default deleteCard;
