import { Answer } from '../entities/answer';

interface ExecuteParams {
  questionId: string;
  instructorId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: ExecuteParams) {
    const answer = new Answer(content);

    return answer;
  }
}
