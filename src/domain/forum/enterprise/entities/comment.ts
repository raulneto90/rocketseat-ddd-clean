import { Entity } from '@api/core/entities/entity';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface CommentProps {
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {
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
}
