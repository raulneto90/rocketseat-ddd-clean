import { Entity } from '../../core/entities/entity';
import type { Optional } from '../../core/types/optional';
import type { Slug } from './value-objects/slug';
import type { UniqueEntityId } from './value-objects/unique-entity-id';

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
    const question = new Question(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
