import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(private readonly answerCommentsRepository: AnswerCommentRepository) {}

  async execute({ authorId, answerCommentId }: DeleteAnswerUseCaseRequest): Promise<void> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error('Answer comment not found');
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed to delete this comment');
    }

    return this.answerCommentsRepository.delete(answerComment);
  }
}
