import { makeAnswer } from 'tests/factories/make-answer';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeleteAnswerUseCase } from './delete-answer';

describe('DeleteAnswerUseCase', () => {
  let useCase: DeleteAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    useCase = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await useCase.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    });

    expect(inMemoryAnswersRepository.answers).toHaveLength(0);
  });

  it('should not be able to delete a answer if it does not exist', async () => {
    const result = await useCase.execute({
      answerId: 'non-existing-answer',
      authorId: 'author-1',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should not be able to delete a answer if the author is different', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const result = await useCase.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
