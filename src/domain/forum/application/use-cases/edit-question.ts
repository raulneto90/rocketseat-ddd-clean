import { Either, failure, success } from '@api/core/errors/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  questionId: string;
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class EditQuestionUseCase {
  constructor(private readonly questionsRepository: QuestionsRepository) {}

  async execute({
    content,
    title,
    authorId,
    questionId,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.update(question);

    return success({ question });
  }
}
