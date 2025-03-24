import { PaginationParams } from '@api/core/repositories/pagination-params';
import { AnswersRepository } from '@api/domain/forum/application/repositories/answers-repository';
import { Answer } from '@api/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = [];

  async create(answer: Answer): Promise<void> {
    this.answers.push(answer);
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.answers.find(answer => answer.id.toString() === id);

    if (!answer) {
      return null;
    }

    return answer;
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]> {
    const answers = this.answers
      .filter(answer => answer.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }

  async update(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(item => item.id === answer.id);

    this.answers[answerIndex] = answer;
  }

  async delete(answer: Answer): Promise<void> {
    const answerIndex = this.answers.findIndex(item => item.id === answer.id);

    this.answers.splice(answerIndex, 1);
  }
}
