import { randomUUID } from 'node:crypto';

interface ConstructorParams {
  content: string;
  authorId: string;
  questionId: string;
  id?: string;
}

export class Answer {
  public id: string;
  public content: string;
  public authorId: string;
  public questionId: string;

  constructor(props: ConstructorParams) {
    this.id = props.id ?? randomUUID();
    this.content = props.content;
    this.authorId = props.authorId;
    this.questionId = props.questionId;
  }
}
