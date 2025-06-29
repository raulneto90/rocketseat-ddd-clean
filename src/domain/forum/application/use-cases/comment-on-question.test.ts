import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

describe('CommentOnQuestionUseCase', () => {
  let useCase: CommentOnQuestionUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
  let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
    useCase = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository);
  });

  it('should be able to comment on a question', async () => {
    const question = makeQuestion();

    await inMemoryQuestionsRepository.create(question);

    const result = await useCase.execute({
      questionId: question.id.toString(),
      authorId: 'author-1',
      content: 'Example comment',
    });

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);

    if (result.isRight()) {
      const { questionComment } = result.result;
      expect(questionComment.id).toBeTruthy();
      expect(questionComment.content).toEqual('Example comment');
      expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);
      expect(inMemoryQuestionCommentsRepository.items[0]).toEqual(questionComment);
    }
  });

  it('should not be able to comment on a non-existing question', async () => {
    const result = await useCase.execute({
      questionId: 'non-existing-question',
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
