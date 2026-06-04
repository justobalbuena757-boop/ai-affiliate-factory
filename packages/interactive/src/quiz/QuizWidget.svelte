<script lang="ts">
  import { questions, results } from './data';
  import { calculateScore, getResult } from './scoring';
  import type { QuizResult } from './types';

  let currentStep = $state<'welcome' | 'questions' | 'results'>('welcome');
  let currentQuestion = $state(0);
  let answers = $state<Record<number, number>>({});
  let result = $state<QuizResult | null>(null);
  let score = $state(0);

  let answeredCount = $derived(Object.keys(answers).length);
  let progress = $derived(Math.round((answeredCount / questions.length) * 100));
  let isLastQuestion = $derived(currentQuestion === questions.length - 1);

  function selectAnswer(questionIndex: number, answerIndex: number, event: Event) {
    const target = event.currentTarget as HTMLElement;
    const parent = target.closest('[data-quiz-answers]');
    if (parent) {
      parent.querySelectorAll('[data-quiz-answer]').forEach((el) => {
        el.classList.remove('ring-2', 'ring-[var(--color-cta-primary)]', 'bg-[var(--color-cta-primary-lighter)]', 'border-[var(--color-cta-primary)]');
        el.classList.add('border-[var(--color-border-subtle)]');
      });
      target.classList.remove('border-[var(--color-border-subtle)]');
      target.classList.add('ring-2', 'ring-[var(--color-cta-primary)]', 'bg-[var(--color-cta-primary-lighter)]', 'border-[var(--color-cta-primary)]');
    }
    answers = { ...answers, [questionIndex]: answerIndex };
  }

  function goNext() {
    if (answers[questions[currentQuestion].id] !== undefined && currentQuestion < questions.length - 1) {
      currentQuestion++;
    }
  }

  function goPrev() {
    if (currentQuestion > 0) {
      currentQuestion--;
    }
  }

  function submitQuiz() {
    if (answeredCount < questions.length) return;
    const calculated = calculateScore(answers, questions);
    score = calculated;
    result = getResult(calculated, results);
    currentStep = 'results';
  }

  function startQuiz() {
    currentStep = 'questions';
  }

  function restart() {
    currentStep = 'welcome';
    currentQuestion = 0;
    answers = {};
    result = null;
    score = 0;
  }
</script>

<div class="mx-auto max-w-[var(--layout-prose-max)]">
  {#if currentStep === 'welcome'}
    <div class="text-center py-[var(--space-8)]">
      <div class="w-16 h-16 mx-auto mb-[var(--space-6)] rounded-[var(--radius-full)] bg-[var(--color-cta-primary-lighter)] flex items-center justify-center">
        <span class="text-2xl" aria-hidden="true">⚡</span>
      </div>
      <h2 class="text-[var(--text-headline)] font-bold text-[var(--color-text-primary)] leading-[var(--leading-tight)] mb-[var(--space-4)]">
        Discover Your Metabolic Score
      </h2>
      <p class="text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--space-6)]">
        Answer 8 quick questions about your energy, sleep, nutrition, and lifestyle habits. You'll get a personalized metabolic health score plus recommendations tailored to your results.
      </p>
      <button
        onclick={startQuiz}
        class="px-[var(--space-8)] py-[var(--space-4)] rounded-[var(--radius-md)] bg-[var(--color-cta-primary)] text-[var(--color-text-inverse)] font-semibold text-[var(--text-body)] leading-[var(--leading-normal)] border-0 cursor-pointer hover:bg-[var(--color-cta-primary-darker)] transition-colors duration-[var(--motion-duration-fast)]"
      >
        Start the Quiz
      </button>
    </div>

  {:else if currentStep === 'questions'}
    <div>
      <div class="flex items-center justify-between mb-[var(--space-3)]">
        <span class="text-[var(--text-caption)] text-[var(--color-text-muted)]">Question {currentQuestion + 1} of {questions.length}</span>
        <span class="text-[var(--text-caption)] text-[var(--color-text-muted)]">{progress}% complete</span>
      </div>

      <div class="w-full h-[var(--space-1)] bg-[var(--color-surface-tertiary)] rounded-[var(--radius-full)] mb-[var(--space-8)] overflow-hidden">
        <div
          class="h-full bg-[var(--color-cta-primary)] rounded-[var(--radius-full)] transition-all duration-[var(--motion-duration-normal)] ease-[var(--motion-easing-emphasized)]"
          style="width: {progress}%"
        />
      </div>

      <div class="mb-[var(--space-8)]">
        <h3 class="text-[var(--text-title)] font-semibold text-[var(--color-text-primary)] leading-[var(--leading-snug)] mb-[var(--space-6)]">
          {questions[currentQuestion].text}
        </h3>

        <div class="space-y-[var(--space-3)]" data-quiz-answers>
          {#each questions[currentQuestion].answers as answer, answerIndex}
            {@const selected = answers[questions[currentQuestion].id] === answerIndex}
            <button
              data-quiz-answer
              onclick={(e) => selectAnswer(questions[currentQuestion].id, answerIndex, e)}
              class="w-full text-left px-[var(--space-5)] py-[var(--space-4)] rounded-[var(--radius-md)] border cursor-pointer transition-all duration-[var(--motion-duration-fast)] text-[var(--text-body)] text-[var(--color-text-primary)] leading-[var(--leading-relaxed)]
                {selected
                  ? 'ring-2 ring-[var(--color-cta-primary)] bg-[var(--color-cta-primary-lighter)] border-[var(--color-cta-primary)]'
                  : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-cta-primary-light)]'}"
            >
              {answer.text}
            </button>
          {/each}
        </div>
      </div>

      <div class="flex items-center justify-between">
        <button
          onclick={goPrev}
          disabled={currentQuestion === 0}
          class="px-[var(--space-5)] py-[var(--space-3)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] text-[var(--text-body)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-surface-secondary)] transition-colors"
        >
          &larr; Back
        </button>

        {#if isLastQuestion}
          <button
            onclick={submitQuiz}
            disabled={answeredCount < questions.length}
            class="px-[var(--space-6)] py-[var(--space-3)] rounded-[var(--radius-md)] bg-[var(--color-cta-primary)] text-[var(--color-text-inverse)] font-semibold text-[var(--text-body)] border-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-cta-primary-darker)] transition-colors"
          >
            See My Results
          </button>
        {:else}
          <button
            onclick={goNext}
            disabled={answers[questions[currentQuestion].id] === undefined}
            class="px-[var(--space-6)] py-[var(--space-3)] rounded-[var(--radius-md)] bg-[var(--color-cta-primary)] text-[var(--color-text-inverse)] font-semibold text-[var(--text-body)] border-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-cta-primary-darker)] transition-colors"
          >
            Next &rarr;
          </button>
        {/if}
      </div>
    </div>

  {:else if currentStep === 'results' && result}
    <div class="text-center py-[var(--space-4)]">
      <div class="w-20 h-20 mx-auto mb-[var(--space-6)] rounded-[var(--radius-full)] bg-[var(--color-cta-primary-lighter)] flex items-center justify-center">
        <span class="text-3xl font-bold text-[var(--color-cta-primary)]">{score}</span>
      </div>

      <p class="text-[var(--text-caption)] text-[var(--color-text-muted)] uppercase tracking-wide mb-[var(--space-2)]">Your Metabolic Score</p>
      <h2 class="text-[var(--text-headline)] font-bold text-[var(--color-text-primary)] leading-[var(--leading-tight)] mb-[var(--space-4)]">
        {result.title}
      </h2>
      <p class="text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)] mb-[var(--space-8)] max-w-[var(--layout-prose-max)] mx-auto">
        {result.description}
      </p>

      <div class="mb-[var(--space-8)] text-left max-w-[var(--layout-prose-max)] mx-auto">
        <p class="font-semibold text-[var(--color-text-primary)] mb-[var(--space-3)]">Your profile shows:</p>
        <ul class="space-y-[var(--space-2)]">
          {#each result.traits as trait}
            <li class="flex items-start gap-[var(--space-2)] text-[var(--text-body)] text-[var(--color-text-secondary)] leading-[var(--leading-relaxed)]">
              <span class="text-[var(--color-cta-primary)] mt-[var(--space-1)]" aria-hidden="true">✓</span>
              {trait}
            </li>
          {/each}
        </ul>
      </div>

      <a
        href={result.cta.href}
        class="inline-block px-[var(--space-8)] py-[var(--space-4)] rounded-[var(--radius-md)] bg-[var(--color-cta-primary)] text-[var(--color-text-inverse)] font-semibold text-[var(--text-body)] leading-[var(--leading-normal)] no-underline hover:bg-[var(--color-cta-primary-darker)] transition-colors duration-[var(--motion-duration-fast)] mb-[var(--space-4)]"
      >
        {result.cta.label}
      </a>

      <div>
        <button
          onclick={restart}
          class="text-[var(--text-body)] text-[var(--color-cta-primary)] hover:text-[var(--color-cta-primary-darker)] underline cursor-pointer bg-transparent border-0"
        >
          Take the Quiz Again
        </button>
      </div>
    </div>
  {/if}
</div>
