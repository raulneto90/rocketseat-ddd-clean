import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { CreateQuestionUseCase } from './create-question';

describe('CreateQuestionUseCase', () => {
  const fakeQuestionsRepository: QuestionsRepository = {
    create: async (question: Question) => {},
  };

  it('should be able to create a question', async () => {
    const useCase = new CreateQuestionUseCase(fakeQuestionsRepository);

    const { question } = await useCase.execute({
      authorId: 'author-1',
      title: 'Question Title',
      content: 'Question Content',
    });

    expect(question).toBeInstanceOf(Question);
    expect(question.id).toBeDefined();
    expect(question.authorId.toValue()).toEqual('author-1');
    expect(question.title).toEqual('Question Title');
    expect(question.content).toEqual('Question Content');
    expect(question.createdAt).toBeInstanceOf(Date);
  });
});
