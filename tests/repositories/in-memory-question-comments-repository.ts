import { QuestionCommentRepository } from '@api/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@api/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
  }
}
