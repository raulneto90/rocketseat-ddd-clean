import { Either, success } from '@api/core/errors/either';
import { Question } from '../../enterprise/entities/question';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionsRepository } from '../repositories/questions-repository';

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({ authorId, content, title }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      content,
      title,
    });

    await this.questionsRepository.create(question);

    return success({
      question,
    });
  }
}
