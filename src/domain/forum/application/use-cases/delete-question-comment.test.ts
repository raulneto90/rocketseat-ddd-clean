import { makeQuestionComment } from 'tests/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';

describe('DeleteQuestionComment', () => {
  let useCase: DeleteQuestionCommentUseCase;

  let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;

  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    useCase = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await useCase.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a non-existing question comment', async () => {
    const result = await useCase.execute({
      authorId: 'author-1',
      questionCommentId: 'non-existing-comment',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });

  it('should not be able to delete a question comment from another user', async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await useCase.execute({
      authorId: 'author-2',
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });
});
