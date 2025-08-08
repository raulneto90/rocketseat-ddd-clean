import { Either, failure, success } from '@api/core/errors/either';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;
export class DeleteAnswerCommentUseCase {
  constructor(private readonly answerCommentsRepository: AnswerCommentRepository) {}

  async execute({ authorId, answerCommentId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      return failure(new ResourceNotFoundError());
    }

    if (answerComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.answerCommentsRepository.delete(answerComment);

    return success({});
  }
}
