import { makeAnswer } from 'tests/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('CommentOnAnswerUseCase', () => {
  let useCase: CommentOnAnswerUseCase;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;
  let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    useCase = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
  });

  it('should be able to comment on a answer', async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    const result = await useCase.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'Example comment',
    });

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      expect(result.result.answerComment).toBeDefined();
      expect(result.result.answerComment.content).toBe('Example comment');
      expect(result.result.answerComment.authorId.toString()).toBe('author-1');
      expect(result.result.answerComment.answerId.toString()).toBe(answer.id.toString());
    }
  });

  it('should not be able to comment on a non-existing answer', async () => {
    const result = await useCase.execute({
      answerId: 'non-existing-answer',
      authorId: 'author-1',
      content: 'Example comment',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});
