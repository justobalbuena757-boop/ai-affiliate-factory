import type { QuizQuestion, QuizResult } from './types';

export function calculateScore(answers: Record<number, number>, questions: QuizQuestion[]): number {
  let total = 0;
  let maxPossible = 0;

  for (const question of questions) {
    maxPossible += Math.max(...question.answers.map((a) => a.score));
    const answerIndex = answers[question.id];
    if (answerIndex !== undefined && question.answers[answerIndex]) {
      total += question.answers[answerIndex].score;
    }
  }

  return maxPossible > 0 ? Math.round((total / maxPossible) * 100) : 0;
}

export function getResult(score: number, results: QuizResult[]): QuizResult {
  for (const r of results) {
    if (score >= r.minScore && score <= r.maxScore) return r;
  }
  return results[results.length - 1]!;
}
