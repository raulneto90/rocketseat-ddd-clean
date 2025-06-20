import { makeQuestionComment } from 'tests/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'tests/repositories/in-memory-question-comments-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { ListQuestionCommentsUseCase } from './list-question-comments';

describe('ListQuestionCommentsUseCase', () => {
  let useCase: ListQuestionCommentsUseCase;
  let commentsRepository: InMemoryQuestionCommentsRepository;

  beforeEach(() => {
    commentsRepository = new InMemoryQuestionCommentsRepository();
    useCase = new ListQuestionCommentsUseCase(commentsRepository);
  });

  it('should be able to list question comments', async () => {
    await commentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
    await commentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));
    await commentsRepository.create(makeQuestionComment({ questionId: new UniqueEntityId('question-1') }));

    const { questionComments } = await useCase.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(questionComments).toHaveLength(3);
  });

  it('should be able to paginate question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await commentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const { questionComments } = await useCase.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(questionComments).toHaveLength(2);
  });
});
