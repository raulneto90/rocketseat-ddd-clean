import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswersRepository } from '../repositories/answers-repository';

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
