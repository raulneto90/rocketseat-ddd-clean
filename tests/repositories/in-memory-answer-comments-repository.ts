import { AnswerCommentRepository } from '@api/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@api/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }
}
