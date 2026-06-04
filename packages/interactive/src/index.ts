export { default as QuizWidget } from './quiz/QuizWidget.svelte';
export { questions, results } from './quiz/data';
export { calculateScore, getResult } from './quiz/scoring';
export type { QuizQuestion, QuizAnswer, QuizResult } from './quiz/types';
