import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { CreateQuestionUseCase } from './create-question';

describe('CreateQuestionUseCase', () => {
  let useCase: CreateQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    useCase = new CreateQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to create a question', async () => {
    const result = await useCase.execute({
      authorId: 'author-1',
      title: 'Question Title',
      content: 'Question Content',
    });

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      const { question } = result.result;
      expect(question).toBeInstanceOf(Question);
      expect(question.id).toBeDefined();
      expect(question.authorId.toValue()).toEqual('author-1');
      expect(question).toBeInstanceOf(Question);
      expect(question.id).toBeDefined();
      expect(question.authorId.toValue()).toEqual('author-1');
      expect(question.title).toEqual('Question Title');
      expect(question.content).toEqual('Question Content');
      expect(question.createdAt).toBeInstanceOf(Date);
    }
  });
});
