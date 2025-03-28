import { PaginationParams } from '@api/core/repositories/pagination-params';
import { Answer } from '@api/domain/forum/enterprise/entities/answer';

export interface AnswersRepository {
  create(answer: Answer): Promise<void>;
  findById(id: string): Promise<Answer | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<Answer[]>;
  update(answer: Answer): Promise<void>;
  delete(answer: Answer): Promise<void>;
}
