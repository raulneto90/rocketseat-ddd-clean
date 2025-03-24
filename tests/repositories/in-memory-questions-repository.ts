import { PaginationParams } from '@api/core/repositories/pagination-params';
import { QuestionsRepository } from '@api/domain/forum/application/repositories/questions-repository';
import { Question } from '@api/domain/forum/enterprise/entities/question';

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = [];

  async create(question: Question): Promise<void> {
    this.questions.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.questions.find(question => question.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.questions.find(question => question.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.questions
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((page - 1) * 20, page * 20);

    return questions;
  }

  async update(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(item => item.id === question.id);

    this.questions[questionIndex] = question;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.questions.findIndex(item => item.id === question.id);

    this.questions.splice(questionIndex, 1);
  }
}
