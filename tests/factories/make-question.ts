import { Question, QuestionProps } from '@api/domain/forum/enterprise/entities/question';
import { Slug } from '@api/domain/forum/enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export function makeQuestion(override: Partial<QuestionProps> = {}): Question {
  const question = Question.create({
    title: 'Question Title',
    slug: Slug.create('question-slug'),
    content: 'Question Content',
    authorId: new UniqueEntityId('author-1'),
    ...override,
  });

  return question;
}
