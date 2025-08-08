import { AggregateRoot } from '@api/core/entities/aggregate-root';
import { Optional } from '@api/core/types/optional';
import dayjs from 'dayjs';
import { QuestionAttachment } from './question-attachment';
import { Slug } from './value-objects/slug';
import { UniqueEntityId } from './value-objects/unique-entity-id';

export interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  attachments: QuestionAttachment[];
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends AggregateRoot<QuestionProps> {
  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId;
  }

  get slug(): Slug {
    return this.props.slug;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  get bestAnswerId(): UniqueEntityId | undefined {
    return this.props.bestAnswerId;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
  }

  get attachments(): QuestionAttachment[] {
    return this.props.attachments;
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromText(title);
    this.updateDate();
  }

  set content(content: string) {
    this.props.content = content;
    this.updateDate();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId;
    this.updateDate();
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments;
    this.updateDate();
  }

  static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityId) {
    const question = new Question(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? [],
      },
      id,
    );

    return question;
  }

  private updateDate(): void {
    this.props.updatedAt = new Date();
  }
}
