import { makeAnswer } from 'tests/factories/make-answer';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { EditAnswerUseCase } from './edit-answer';

describe('EditAnswerUseCase', () => {
  let useCase: EditAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    useCase = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to update a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await useCase.execute({
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'New content',
    });

    expect(inMemoryAnswersRepository.answers[0]).toMatchObject({
      content: 'New content',
    });
  });

  it('should not be able to update a answer if it does not exist', async () => {
    const result = await useCase.execute({
      answerId: 'non-existing-answer',
      authorId: 'author-1',
      content: 'New content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should not be able to update a answer if the author is different', async () => {
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
      content: 'New content',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
