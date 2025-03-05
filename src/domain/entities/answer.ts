import { Entity } from '../../core/entities/entity';
import type { UniqueEntityId } from './value-objects/unique-entity-id';

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(): string {
    return this.props.content;
  }
}
