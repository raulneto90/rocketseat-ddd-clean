import { Either, success } from '@api/core/errors/either';
import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionParams {
  questionId: string;
  instructorId: string;
  content: string;
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionParams): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return success({
      answer,
    });
  }
}
