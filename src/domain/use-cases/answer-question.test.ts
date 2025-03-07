import type { Answer } from '../entities/answer';
import type { AnswersRepository } from '../repositories/answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

describe(' Answer Question Use Case', () => {
  const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => Promise.resolve(),
  };

  let answerQuestionUseCase: AnswerQuestionUseCase;

  beforeEach(() => {
    answerQuestionUseCase = new AnswerQuestionUseCase(fakeAnswersRepository);
  });

  it('should create an answer', async () => {
    const answer = await answerQuestionUseCase.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    });

    expect(answer).toBeTruthy();
    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Nova resposta');
  });
});
