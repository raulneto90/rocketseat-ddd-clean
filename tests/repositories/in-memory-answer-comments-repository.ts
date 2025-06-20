import { AnswerCommentRepository } from '@api/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@api/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find(item => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const index = this.items.findIndex(item => item.id === answerComment.id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
