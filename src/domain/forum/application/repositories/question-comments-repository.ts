import { PaginationParams } from '@api/core/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionCommentRepository {
  create(questionComment: QuestionComment): Promise<void>;
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>;
  delete(questionComment: QuestionComment): Promise<void>;
}
