import { Entity } from '@api/core/entities/entity';
import { Optional } from '@api/core/types/optional';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface AnswerCommentProps {
  authorId: UniqueEntityId;
  answerId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComment extends Entity<AnswerCommentProps> {
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
