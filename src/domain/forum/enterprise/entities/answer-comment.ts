import { Optional } from '@api/core/types/optional';
import { Comment, CommentProps } from './comment';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityId;
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId(): UniqueEntityId {
    return this.props.answerId;
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId): AnswerComment {
    return new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );
  }
}
