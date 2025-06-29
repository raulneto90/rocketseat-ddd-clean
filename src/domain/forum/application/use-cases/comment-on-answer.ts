import { Either, failure, success } from '@api/core/errors/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';
import { AnswersRepository } from '../repositories/answers-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answerComment: AnswerComment }>;

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answerCommentsRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    answerId,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return failure(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    });

    await this.answerCommentsRepository.create(answerComment);

    return success({ answerComment });
  }
}
