import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
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

    const { question } = await useCase.execute({
      slug: 'question-slug',
    });

    expect(question).toBeInstanceOf(Question);
    expect(question.id).toBeDefined();
    expect(question.authorId.toValue()).toEqual('author-1');
    expect(question.title).toEqual(newQuestion.title);
    expect(question.content).toEqual(newQuestion.content);
    expect(question.createdAt).toBeInstanceOf(Date);
  });
});
