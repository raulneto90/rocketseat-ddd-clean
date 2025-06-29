import { makeAnswerComment } from 'tests/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';

describe('DeleteAnswerComment', () => {
  let useCase: DeleteAnswerCommentUseCase;

  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    useCase = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await useCase.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non-existing answer comment', async () => {
    const result = await useCase.execute({
      authorId: 'author-1',
      answerCommentId: 'non-existing-comment',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBe('Answer comment not found');
    }
  });

  it('should not be able to delete a answer comment from another user', async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    const result = await useCase.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBe('Not allowed to delete this comment');
    }
  });
});
