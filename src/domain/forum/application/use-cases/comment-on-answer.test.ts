import { makeAnswer } from 'tests/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'tests/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';

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

    const { answerComment } = await useCase.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'Example comment',
    });

    expect(answerComment.id).toBeTruthy();
    expect(answerComment.content).toEqual('Example comment');
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1);
    expect(inMemoryAnswerCommentsRepository.items[0]).toEqual(answerComment);
  });

  it('should not be able to comment on a non-existing answer', async () => {
    await expect(() =>
      useCase.execute({
        answerId: 'non-existing-answer',
        authorId: 'author-1',
        content: 'Example comment',
      }),
    ).rejects.toThrow('Answer not found');
  });
});
