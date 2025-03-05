import { randomUUID } from 'node:crypto';
import { UniqueEntityId } from '../../domain/entities/value-objects/unique-entity-id';

export class Entity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  get id() {
    return this._id;
  }

  protected constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId(id);
  }
}
