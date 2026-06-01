<script>
  import { onMount } from 'svelte';

  let step = 1;
  let answers = { q1: '', q2: '', q3: '' };
  let result = null;
  let selectedOption = '';

  const questions = [
    {
      id: 'q1',
      title: 'How is your energy level in the afternoon?',
      icon: '⚡',
      options: [
        { value: 'low', label: 'Very low / need caffeine', desc: 'Feel tired quickly' },
        { value: 'medium', label: 'Moderate / okay', desc: 'Some fatigue but manageable' },
        { value: 'high', label: 'Good / consistent', desc: 'Steady energy throughout' },
      ],
    },
    {
      id: 'q2',
      title: 'How would you describe your sleep quality?',
      icon: '😴',
      options: [
        { value: 'poor', label: 'Poor / wake up tired', desc: 'Restless or insufficient sleep' },
        { value: 'fair', label: 'Fair / okay most nights', desc: 'Decent but could improve' },
        { value: 'good', label: 'Good / restful', desc: 'Deep, refreshing sleep' },
      ],
    },
    {
      id: 'q3',
      title: 'What is your primary health goal?',
      icon: '🎯',
      options: [
        { value: 'energy', label: 'More energy', desc: 'Boost daily vitality' },
        { value: 'weight', label: 'Weight management', desc: 'Maintain healthy weight' },
        { value: 'sleep', label: 'Better sleep', desc: 'Improve sleep quality' },
      ],
    },
  ];

  function next() {
    if (step < 3) step++;
    selectedOption = '';
  }

  function prev() {
    if (step > 1) step--;
  }

  function select(value) {
    answers[questions[step - 1].id] = value;
    selectedOption = value;
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

<div class="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200 dark:border-gray-800">
  <div class="flex items-center gap-3 mb-2">
    <span class="text-3xl">{questions[step - 1]?.icon}</span>
    <h3 class="text-xl font-bold text-gray-900 dark:text-white">Quick Metabolic Assessment</h3>
  </div>
  <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
    Answer 3 quick questions to get personalized recommendations
  </p>

  {#if !result}
    <div class="space-y-6">
      <div class="flex items-center justify-between mb-2">
        {#each [1, 2, 3] as s}
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium {s === step ? 'bg-primary text-white' : s < step ? 'bg-green-100 text-green-700 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}">
              {s === step ? '•' : s < step ? '✓' : s}
            </div>
            {#if s < 3}
              <div class="w-10 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
            {/if}
          </div>
        {/each}
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{questions[step - 1].title}</h4>
        <div class="space-y-3">
          {#each questions[step - 1].options as opt}
            <button
              on:click={() => select(opt.value)}
              class={`w-full text-left p-4 rounded-lg border transition-all duration-200 text-sm ${
                selectedOption === opt.value 
                  ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div class="flex items-start justify-between">
                <span class="font-medium text-gray-900 dark:text-white">{opt.label}</span>
                {#if selectedOption === opt.value}
                  <span class="text-primary">✓</span>
                {/if}
              </div>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{opt.desc}</p>
            </button>
          {/each}
        </div>
      </div>

      <div class="flex justify-between pt-4">
        {#if step > 1}
          <button
            on:click={prev}
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ← Back
          </button>
        {:else}
          <div></div>
        {/if}
        {#if selectedOption}
          <button
            on:click={step === 3 ? getResult : next}
            class="text-sm font-medium text-white bg-primary px-4 py-1 rounded hover:bg-primary-dark transition-colors"
          >
            {step === 3 ? 'See Result' : 'Next →'}
          </button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="text-center space-y-6">
      <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
        <span class="text-3xl">🎉</span>
      </div>
      <div>
        <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{result.title}</h4>
        <p class="text-gray-600 dark:text-gray-400">{result.description}</p>
      </div>
      <a
        href={result.href}
        class="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
      >
        {result.cta}
      </a>
      <button
        on:click={() => { result = null; step = 1; answers = { q1: '', q2: '', q3: '' }; }}
        class="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Take quiz again
      </button>
    </div>
  {/if}
</div>