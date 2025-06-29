import { Either, failure, success } from '@api/core/errors/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { QuestionsRepository } from '../repositories/questions-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { questionComment: QuestionComment }>;

export class CommentOnQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionCommentsRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    content,
    questionId,
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      questionId: new UniqueEntityId(questionId),
    });

    await this.questionCommentsRepository.create(questionComment);

    return success({ questionComment });
  }
}
