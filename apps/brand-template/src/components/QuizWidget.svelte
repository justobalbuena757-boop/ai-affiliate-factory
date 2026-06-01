<script>
  import { onMount } from 'svelte';

  let step = 1;
  let answers = { q1: '', q2: '', q3: '' };
  let result = null;

  const questions = [
    {
      id: 'q1',
      title: 'How is your energy level in the afternoon?',
      options: [
        { value: 'low', label: 'Very low / need caffeine' },
        { value: 'medium', label: 'Moderate / okay' },
        { value: 'high', label: 'Good / consistent' },
      ],
    },
    {
      id: 'q2',
      title: 'How would you describe your sleep quality?',
      options: [
        { value: 'poor', label: 'Poor / wake up tired' },
        { value: 'fair', label: 'Fair / okay most nights' },
        { value: 'good', label: 'Good / restful' },
      ],
    },
    {
      id: 'q3',
      title: 'What is your primary health goal?',
      options: [
        { value: 'energy', label: 'More energy' },
        { value: 'weight', label: 'Weight management' },
        { value: 'sleep', label: 'Better sleep' },
      ],
    },
  ];

  function next() {
    if (step < 3) step++;
  }

  function prev() {
    if (step > 1) step--;
  }

  function select(value) {
    answers[questions[step - 1].id] = value;
    if (step < 3) next();
  }

  function getResult() {
    const score = Object.values(answers).filter(v => v).length;
    if (score === 3) {
      result = {
        title: 'Ready for a Metabolic Boost?',
        description: 'Your answers suggest you could benefit from targeted metabolic support. Java Burn combines science-backed ingredients to enhance your morning routine.',
        cta: 'Learn More About Java Burn',
        href: 'https://www.javaburn.net/',
      };
    } else {
      result = {
        title: 'Start Your Journey',
        description: 'Small changes can make a big difference. Consider exploring our articles for evidence-based tips.',
        cta: 'Explore Articles',
        href: '/coffee-wellness',
      };
    }
  }
</script>

<div class="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 sm:p-8">
  <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Metabolic Assessment</h3>

  {#if !result}
    <div class="space-y-6">
      <div class="flex items-center justify-between mb-4">
        {#each [1, 2, 3] as s}
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium {s === step ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}">
              {s}
            </div>
            {#if s < 3}
              <div class="w-8 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {/if}
          </div>
        {/each}
      </div>

      <div>
        <h4 class="font-semibold text-gray-900 dark:text-white mb-4">{questions[step - 1].title}</h4>
        <div class="space-y-2">
          {#each questions[step - 1].options as opt}
            <button
              on:click={() => select(opt.value)}
              class="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
            >
              {opt.label}
            </button>
          {/each}
        </div>
      </div>

      {#if step > 1}
        <button
          on:click={prev}
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
        >
          Back
        </button>
      {/if}
    </div>
  {:else}
    <div class="text-center space-y-4">
      <h4 class="text-xl font-bold text-gray-900 dark:text-white">{result.title}</h4>
      <p class="text-gray-600 dark:text-gray-400">{result.description}</p>
      <a
        href={result.href}
        class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        {result.cta}
      </a>
    </div>
  {/if}
</div>