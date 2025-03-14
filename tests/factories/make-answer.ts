import { Answer, AnswerProps } from '@api/domain/forum/enterprise/entities/answer';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeAnswer(override: Partial<AnswerProps> = {}, id?: UniqueEntityId): Answer {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityId('question-id-1'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('author-1'),
      createdAt: new Date(),
      ...override,
    },
    id,
  );

  return answer;
}
