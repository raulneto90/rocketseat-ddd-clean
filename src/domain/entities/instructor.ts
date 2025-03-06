import { Entity } from '../../core/entities/entity';
import type { UniqueEntityId } from './value-objects/unique-entity-id';

interface InstructorProps {
  name: string;
}

export class Instructor extends Entity<InstructorProps> {
  get name(): string {
    return this.props.name;
  }

  static create(props: InstructorProps, id?: UniqueEntityId): Instructor {
    return new Instructor(props, id);
  }
}
