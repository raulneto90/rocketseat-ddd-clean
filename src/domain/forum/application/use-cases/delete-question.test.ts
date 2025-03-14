import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
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
    await expect(
      useCase.execute({
        questionId: 'question-1',
        authorId: 'author-1',
      }),
    ).rejects.toThrow('Question not found');
  });

  it('should not be able to delete a question if the author is different', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      useCase.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      }),
    ).rejects.toThrow('Not allowed');
  });
});
