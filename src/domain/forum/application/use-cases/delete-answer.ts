import { Either, failure, success } from '@api/core/errors/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== answer.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    await this.answersRepository.delete(answer);
    return success({});
  }
}
