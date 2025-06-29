import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { ListRecentQuestionsUseCase } from './list-recent-questions';

describe('ListRecentQuestionsUseCase', () => {
  let useCase: ListRecentQuestionsUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    useCase = new ListRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to list recent questions', async () => {
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2023-01-01') }));
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2023-01-02') }));
    await inMemoryQuestionsRepository.create(makeQuestion({ createdAt: new Date('2023-01-03') }));

    const result = await useCase.execute({ page: 1 });
    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      const { questions } = result.result;
      expect(questions).toHaveLength(3);
      expect(questions[0].createdAt).toEqual(new Date('2023-01-03'));
      expect(questions[1].createdAt).toEqual(new Date('2023-01-02'));
      expect(questions[2].createdAt).toEqual(new Date('2023-01-01'));
    }
  });

  it('should be able to paginate recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const result = await useCase.execute({ page: 2 });

    if (result.isRight()) {
      const { questions } = result.result;
      expect(questions).toHaveLength(2);
    }
  });
});
