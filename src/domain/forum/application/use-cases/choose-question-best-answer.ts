import { Question } from '../../enterprise/entities/question';
import { AnswersRepository } from '../repositories/answers-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface ChoooseQuestionBestAnswerParams {
  answerId: string;
  authorId: string;
}

interface ChoooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChoooseQuestionBestAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly questionsRepository: QuestionsRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChoooseQuestionBestAnswerParams): Promise<ChoooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    const question = await this.questionsRepository.findById(answer.questionId.toValue());

    if (!question) {
      throw new Error('Question not found');
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.update(question);

    return { question };
  }
}
