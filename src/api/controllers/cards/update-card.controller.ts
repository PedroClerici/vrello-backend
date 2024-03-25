import { type Request, type Response } from 'express';

import UpdateCardRequestDTO from '@/api/dtos/cards/update-card/update-card-request.dto';
import UpdateCardResponseDTO from '@/api/dtos/cards/update-card/update-card-response.dto';
import UpdateCardService from '@/api/services/cards/update-card.service';
import CardsRepositoryMongoose from '@/api/repositories/mongoose/cards.repository';

const updateCard = async (request: Request, response: Response) => {
  const data = new UpdateCardRequestDTO({
    id: request.params.cardId,
    ...request.body,
  });

  const card = await new UpdateCardService(
    new CardsRepositoryMongoose(),
  ).execute(data);

  return response.status(200).json(new UpdateCardResponseDTO(card).getAll());
};

export default updateCard;
