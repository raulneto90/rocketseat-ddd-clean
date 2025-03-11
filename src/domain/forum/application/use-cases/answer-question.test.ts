import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

describe(' Answer Question Use Case', () => {
  let useCase: AnswerQuestionUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    useCase = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should create an answer', async () => {
    const { answer } = await useCase.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    });

    expect(answer).toBeTruthy();
    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Nova resposta');
  });
});
