import { makeAnswer } from 'tests/factories/make-answer';
import { makeQuestion } from 'tests/factories/make-question';
import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { ChoooseQuestionBestAnswerUseCase } from './choose-question-best-answer';

describe('ChooseQuestionBestAnswerUseCase', () => {
  let useCase: ChoooseQuestionBestAnswerUseCase;
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
  let inMemoryAnswersRepository: InMemoryAnswersRepository;

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    useCase = new ChoooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository);
  });

  it('should be able to choose the question best answer', async () => {
    const newQuestion = makeQuestion();

    const answer = makeAnswer({
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(answer);

    await useCase.execute({
      answerId: answer.id.toString(),
      authorId: newQuestion.authorId.toString(),
    });

    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty('bestAnswerId', answer.id);
  });

  it('should not be able to choose another user question best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    });

    const answer = makeAnswer({
      questionId: newQuestion.id,
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(answer);

    const result = await useCase.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(NotAllowedError);
    }
  });

  it('should not be able to choose a non existent question best answer', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    });

    const answer = makeAnswer({
      questionId: new UniqueEntityId('question-2'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);
    await inMemoryAnswersRepository.create(answer);

    const result = await useCase.execute({
      answerId: 'question-1',
      authorId: 'author-2',
    });

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);

    if (result.isLeft()) {
      expect(result.reason).toBeInstanceOf(ResourceNotFoundError);
    }
  });
});
