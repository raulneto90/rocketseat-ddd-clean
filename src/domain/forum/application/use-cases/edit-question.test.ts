import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('EditQuestionUseCase', () => {
  let useCase: EditQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    useCase = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to update a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await useCase.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'New title',
      content: 'New content',
    });

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    });
  });

  it('should not be able to update a question if it does not exist', async () => {
    const result = await useCase.execute({
      questionId: 'non-existing-question',
      authorId: 'author-1',
      title: 'New title',
      content: 'New content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should not be able to update a question if the author is different', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const result = await useCase.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      title: 'New title',
      content: 'New content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
