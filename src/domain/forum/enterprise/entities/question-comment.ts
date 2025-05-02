import { Entity } from '@api/core/entities/entity';
import { Optional } from '@api/core/types/optional';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface QuestionCommentProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class QuestionComment extends Entity<QuestionCommentProps> {
  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
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
