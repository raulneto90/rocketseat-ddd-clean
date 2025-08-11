import { Either, failure, success } from '@api/core/errors/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from '../errors/not-allowed-error';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { QuestionAttachmentRepository } from '../repositories/question-attachments-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  questionId: string;
  attachmentsIds: string[];
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>;

export class EditQuestionUseCase {
  constructor(
    private readonly questionsRepository: QuestionsRepository,
    private readonly questionAttachmentsRepository: QuestionAttachmentRepository,
  ) {}

  async execute({
    content,
    title,
    authorId,
    questionId,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return failure(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return failure(new NotAllowedError());
    }

    const currentAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const questionAttachmentList = new QuestionAttachmentList(currentAttachments);

    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttachment.create({
        questionId: question.id,
        attachmentId: new UniqueEntityId(attachmentId),
      });
    });

    questionAttachmentList.update(questionAttachments);

    question.title = title;
    question.content = content;
    question.attachments = questionAttachmentList;

    await this.questionsRepository.update(question);

    return success({ question });
  }
}
