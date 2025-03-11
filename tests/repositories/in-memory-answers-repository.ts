import { AnswersRepository } from '@api/domain/forum/application/repositories/answers-repository';
import { Answer } from '@api/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  private answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }
}
