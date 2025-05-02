import { Optional } from '@api/core/types/optional';
import { Comment, CommentProps } from './comment';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  static create(props: Optional<QuestionCommentProps, 'createdAt'>, id?: UniqueEntityId): QuestionComment {
    return new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
