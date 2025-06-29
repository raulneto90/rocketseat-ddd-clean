import { Either, failure, success } from '@api/core/either';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerUseCaseResponse = Either<string, {}>;
export class DeleteAnswerCommentUseCase {
  constructor(private readonly answerCommentsRepository: AnswerCommentRepository) {}

  async execute({ authorId, answerCommentId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return failure('Answer comment not found');
    }

    if (answerComment.authorId.toString() !== authorId) {
      return failure('Not allowed to delete this comment');
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({});
  }
}
