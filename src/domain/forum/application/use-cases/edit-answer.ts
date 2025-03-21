import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  authorId: string;
  content: string;
  answerId: string;
}

type EditAnswerUseCaseResponse = {
  answer: Answer;
};

export class EditAnswerUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({ content, authorId, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed');
    }

    answer.content = content;

    await this.answersRepository.update(answer);

    return { answer };
  }
}
