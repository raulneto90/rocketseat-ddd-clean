import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface ListQuestionAnswersUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionAnswersUseCaseResponse {
  answers: Answer[];
}

export class ListQuestionAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ page, questionId }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return {
      answers,
    };
  }
}
