import { AnswerComment, AnswerCommentProps } from '@api/domain/forum/enterprise/entities/answer-comment';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export function makeAnswerComment(override: Partial<AnswerCommentProps> = {}, id?: UniqueEntityId) {
  return AnswerComment.create(
    {
      authorId: new UniqueEntityId('author-id'),
      answerId: new UniqueEntityId('answer-id'),
      content: 'This is a comment',
      ...override,
    },
    id,
  );
}
