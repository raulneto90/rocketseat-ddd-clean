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
    const result = await useCase.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova resposta',
    });

    expect(result).toBeTruthy();
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      expect(result.result.answer).toBeDefined();
      expect(result.result.answer.content).toBe('Nova resposta');
      expect(result.result.answer.authorId.toString()).toBe('1');
      expect(result.result.answer.questionId.toString()).toBe('1');
    }
  });
});
