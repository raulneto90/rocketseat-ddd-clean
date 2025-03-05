import { Entity } from '../../core/entities/entity';

interface StudentProps {
  id?: string;
  name: string;
}

export class Student extends Entity<StudentProps> {}
