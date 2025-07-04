import { Either, failure, success } from '@api/core/errors/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>;

export class GetQuestionBySlugUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    return success({ question });
  }
}
