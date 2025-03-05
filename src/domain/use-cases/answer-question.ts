import { Answer } from '../entities/answer';
import { UniqueEntityId } from '../entities/value-objects/unique-entity-id';
import type { AnswersRepository } from '../repositories/answers-repository';

interface ExecuteParams {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ instructorId, questionId, content }: ExecuteParams) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
