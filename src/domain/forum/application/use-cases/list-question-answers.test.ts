import { makeAnswer } from 'tests/factories/make-answer';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { ListQuestionAnswersUseCase } from './list-question-answers';

describe('ListQuestionAnswersUseCase', () => {
  let useCase: ListQuestionAnswersUseCase;
  let answersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository();
    useCase = new ListQuestionAnswersUseCase(answersRepository);
  });

  it('should be able to list question answers', async () => {
    await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
    await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));
    await answersRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-1') }));

    const { answers } = await useCase.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(answers).toHaveLength(3);
  });

  it('should be able to paginate question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const { answers } = await useCase.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(answers).toHaveLength(2);
  });
});
