import { Either, failure, success } from '@api/core/errors/either';
import { Question } from '../../enterprise/entities/question';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ChoooseQuestionBestAnswerParams {
  answerId: string;
  authorId: string;
}

type ChoooseQuestionBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class ChoooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoooseQuestionBestAnswerParams): Promise<ChoooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError());
    }

    const question = await this.questionsRepository.findById(answer.questionId.toValue());

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return success({
      question,
    });
  }
}
