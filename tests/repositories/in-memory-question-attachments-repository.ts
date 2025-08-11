import { QuestionAttachmentRepository } from '@api/domain/forum/application/repositories/question-attachments-repository';
import { QuestionAttachment } from '@api/domain/forum/enterprise/entities/question-attachment';

export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentRepository {
  public items: QuestionAttachment[] = [];

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachments = this.items.filter(item => item.questionId.toString() === questionId);

    return questionAttachments;
  }
}
