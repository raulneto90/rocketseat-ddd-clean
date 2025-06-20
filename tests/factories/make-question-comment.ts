import { QuestionComment, QuestionCommentProps } from '@api/domain/forum/enterprise/entities/question-comment';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export function makeQuestionComment(override: Partial<QuestionCommentProps> = {}, id?: UniqueEntityId) {
  return QuestionComment.create(
    {
      authorId: new UniqueEntityId('author-id'),
      questionId: new UniqueEntityId('question-id'),
      content: 'This is a comment',
      ...override,
    },
    id,
  );
}
