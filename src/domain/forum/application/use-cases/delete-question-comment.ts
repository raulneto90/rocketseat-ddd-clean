import { Either, failure, success } from '@api/core/errors/either';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;

export class DeleteQuestionCommentUseCase {
  constructor(private readonly questionCommentsRepository: QuestionCommentRepository) {}

  async execute({ authorId, questionCommentId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      return failure(new ResourceNotFoundError());
    }

    if (questionComment.authorId.toString() !== authorId) {
      return failure(new NotAllowedError());
    }

    await this.questionCommentsRepository.delete(questionComment);
    return success({});
  }
}
