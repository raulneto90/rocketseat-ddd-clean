import { randomUUID } from 'node:crypto';
import { Entity } from '../../core/entities/entity';
import type { Slug } from './value-objects/slug';

interface QuestionProps {
  title: string;
  content: string;
  slug: Slug;
  authorId: string;
  id?: string;
}

export class Question extends Entity<QuestionProps> {}
