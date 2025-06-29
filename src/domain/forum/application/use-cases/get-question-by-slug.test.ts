import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';
import { GetQuestionBySlugUseCase } from './get-question-by-slug';

describe('GetQuestionBySlugUseCase', () => {
  let useCase: GetQuestionBySlugUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    useCase = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('question-slug'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await useCase.execute({
      slug: 'question-slug',
    });

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      const { question } = result.result;
      expect(question.authorId.toValue()).toEqual('author-1');
      expect(question.title).toEqual(newQuestion.title);
      expect(question.content).toEqual(newQuestion.content);
      expect(question.createdAt).toBeInstanceOf(Date);
    }
  });
});
