import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';
import { AnswersRepository } from '../repositories/answers-repository';

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

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
      throw new Error('Answer not found');
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      content,
      answerId: new UniqueEntityId(answerId),
    });

    await this.answerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
