import { makeQuestion } from 'tests/factories/make-question';
import { makeQuestionAttachment } from 'tests/factories/make-question-attachment';
import { InMemoryQuestionAttachmentsRepository } from 'tests/repositories/in-memory-question-attachments-repository';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { EditQuestionUseCase } from './edit-question';

describe('EditQuestionUseCase', () => {
  let useCase: EditQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
  let inMemoryQuestionAttachmentsRepostory: InMemoryQuestionAttachmentsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionAttachmentsRepostory = new InMemoryQuestionAttachmentsRepository();
    useCase = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepostory);
  });

  it('should be able to update a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepostory.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    );

    await useCase.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'New title',
      content: 'New content',
      attachmentsIds: ['1', '3'],
    });

    expect(inMemoryQuestionsRepository.questions[0]).toMatchObject({
      title: 'New title',
      content: 'New content',
    });
    expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toHaveLength(2);
    expect(inMemoryQuestionsRepository.questions[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ]);
  });

  it('should not be able to update a question if it does not exist', async () => {
    const result = await useCase.execute({
      questionId: 'non-existing-question',
      authorId: 'author-1',
      title: 'New title',
      content: 'New content',
      attachmentsIds: [],
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
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
