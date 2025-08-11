import { QuestionAttachment, QuestionAttachmentProps } from '@api/domain/forum/enterprise/entities/question-attachment';
import { UniqueEntityId } from '@api/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export function makeQuestionAttachment(override: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityId) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityId('question-id'),
      attachmentId: new UniqueEntityId('attachment-id'),
      ...override,
    },
    id,
  );
}
