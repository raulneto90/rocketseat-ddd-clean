import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(private readonly questionCommentsRepository: QuestionCommentRepository) {}

  async execute({ authorId, questionCommentId }: DeleteQuestionUseCaseRequest): Promise<void> {
    const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error('Question comment not found');
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed to delete this comment');
    }

    return this.questionCommentsRepository.delete(questionComment);
  }
}
