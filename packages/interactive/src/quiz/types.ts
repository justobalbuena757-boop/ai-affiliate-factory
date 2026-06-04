export interface QuizAnswer {
  text: string;
  score: number;
}

export interface QuizQuestion {
  id: number;
  text: string;
  answers: QuizAnswer[];
}

export interface QuizResult {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  traits: string[];
  cta: {
    label: string;
    href: string;
  };
}
