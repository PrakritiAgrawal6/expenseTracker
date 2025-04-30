export interface Answer {
  _id: string;
  userId: string;
  answer: string;
  createdAt: string;
}

export interface Question {
  _id: string;
  question: string;
  askedBy: string;
  createdAt: string;
  answers: Answer[];
}