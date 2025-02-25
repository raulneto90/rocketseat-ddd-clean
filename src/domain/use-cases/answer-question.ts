import { Answer } from '../entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';

interface ExecuteParams {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: ExecuteParams) {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    await this.answersRepository.create(answer);

    return answer;
  }
}
