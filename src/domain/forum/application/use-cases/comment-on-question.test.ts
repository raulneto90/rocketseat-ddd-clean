import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';

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

    const { questionComment } = await useCase.execute({
      questionId: question.id.toString(),
      authorId: 'author-1',
      content: 'Example comment',
    });

    expect(questionComment.id).toBeTruthy();
    expect(questionComment.content).toEqual('Example comment');
    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1);
    expect(inMemoryQuestionCommentsRepository.items[0]).toEqual(questionComment);
  });

  it('should not be able to comment on a non-existing question', async () => {
    await expect(() =>
      useCase.execute({
        questionId: 'non-existing-question',
        authorId: 'author-1',
        content: 'Example comment',
      }),
    ).rejects.toThrow('Question not found');
  });
});
