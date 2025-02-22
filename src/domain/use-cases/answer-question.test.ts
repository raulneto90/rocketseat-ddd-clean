import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question';

test('create an answer', () => {
  const answerQuestionUseCase = new AnswerQuestionUseCase();

  const answer = answerQuestionUseCase.execute({
    instructorId: '1',
    questionId: '1',
    content: 'Nova resposta',
  });

  expect(answer).toBeTruthy();
  expect(answer.id).toBeTruthy();
  expect(answer.content).toEqual('Nova resposta');
});
