import { Question, QuestionProps } from '@api/domain/forum/enterprise/entities/question';
import { Slug } from '@api/domain/forum/enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeQuestion(override: Partial<QuestionProps> = {}, id?: UniqueEntityId): Question {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      slug: Slug.create('question-slug'),
      content: faker.lorem.text(),
      authorId: new UniqueEntityId('author-1'),
      ...override,
    },
    id,
  );

  return question;
}
