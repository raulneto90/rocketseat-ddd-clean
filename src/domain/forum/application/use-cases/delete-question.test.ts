import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeleteQuestionUseCase } from './delete-question';

describe('DeleteQuestionUseCase', () => {
  let useCase: DeleteQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    useCase = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await useCase.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    });

    expect(inMemoryQuestionsRepository.questions).toHaveLength(0);
  });

  it('should not be able to delete a question if it does not exist', async () => {
    const result = await useCase.execute({
      questionId: 'non-existing-question',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should not be able to delete a question if the author is different', async () => {
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
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
