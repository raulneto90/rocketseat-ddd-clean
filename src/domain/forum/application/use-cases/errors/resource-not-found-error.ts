import { UseCaseError } from '@api/core/errors/use-case-error';

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found');
  }
}
