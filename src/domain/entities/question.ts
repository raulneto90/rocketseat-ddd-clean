import { randomUUID } from 'node:crypto';

interface ConstructorParams {
  title: string;
  content: string;
  authorId: string;
  id?: string;
}

export class Question {
  public id: string;
  public title: string;
  public content: string;
  public authorId: string;

  constructor(props: ConstructorParams) {
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.id = props.id ?? randomUUID();
  }
}
