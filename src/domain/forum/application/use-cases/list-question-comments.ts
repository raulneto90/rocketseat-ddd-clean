import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface ListQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface ListQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class ListQuestionCommentsUseCase {
  constructor(private readonly questionCommentsRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page });

    return {
      questionComments,
    };
  }
}
