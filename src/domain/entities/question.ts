import { randomUUID } from 'node:crypto';
import type { Slug } from './value-objects/slug';

interface ConstructorParams {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
  id?: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public slug: Slug;
  public authorId: string;

  constructor(props: ConstructorParams) {
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.slug = props.slug;
    this.id = props.id ?? randomUUID();
  }
}
