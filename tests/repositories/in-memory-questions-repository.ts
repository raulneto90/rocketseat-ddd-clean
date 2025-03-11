import { QuestionsRepository } from '@api/domain/forum/application/repositories/questions-repository';
import { Question } from '@api/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  private questions: Question[] = [];

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }
}
