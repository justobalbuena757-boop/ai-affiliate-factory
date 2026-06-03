<script>
let step = $state(1);
let answers = $state({ q1: "", q2: "", q3: "" });
let email = $state("");
let emailSubmitted = $state(false);
let emailError = $state("");
let submitting = $state(false);
let result = $state(null);

const questions = [
	{
		id: "q1",
		title: "How is your afternoon energy?",
		emoji: "⚡",
		options: [
			{ value: "low", label: "Very low — need caffeine to function" },
			{ value: "medium", label: "Moderate — okay but fading by 3pm" },
			{ value: "high", label: "Good — consistent energy all day" },
		],
	},
	{
		id: "q2",
		title: "How is your sleep quality?",
		emoji: "😴",
		options: [
			{ value: "poor", label: "Poor — wake up tired, < 6 hours" },
			{ value: "fair", label: "Fair — 6-7 hours, wake up once" },
			{ value: "good", label: "Good — 7-8 hours, deep sleep" },
		],
	},
	{
		id: "q3",
		title: "What is your primary health focus?",
		emoji: "🎯",
		options: [
			{ value: "energy", label: "Boost daily energy & focus" },
			{ value: "weight", label: "Weight & metabolic health" },
			{ value: "sleep", label: "Improve sleep & recovery" },
		],
	},
];

const resultTypes = {
	metabolic_boost: {
		type: "Metabolic Optimization Candidate",
		badge: "High Priority",
		badgeVariant: "accent",
		summary:
			"Your answers indicate your metabolism could benefit from targeted nutritional support.",
		description:
			"Adults over 40 often experience a natural decline in metabolic rate. Our research suggests that combining morning coffee with targeted supplements like green tea extract, chromium, and L-theanine may help support healthy metabolism, sustained energy, and better sleep quality.",
		recommendations: [
			"Try adding a metabolism-supporting supplement to your morning coffee routine",
			"Prioritize 7-8 hours of quality sleep for hormonal balance",
			"Include protein at breakfast to stabilize blood sugar",
		],
		cta: {
			label: "Learn About Metabolic Support",
			href: "/coffee-wellness/coffee-metabolism/java-burn-review-2025",
		},
	},
	balanced: {
		type: "Balanced Metabolizer",
		badge: "Great Foundation",
		badgeVariant: "success",
		summary:
			"You're on the right track! A few targeted optimizations can help you feel your best after 40.",
		description:
			"You have a solid foundation, but metabolic shifts after 40 mean even small adjustments can yield significant results. Fine-tuning your nutrition, sleep, and supplementation strategy can help you maintain energy, manage weight, and support healthy aging.",
		recommendations: [
			"Consider a morning coffee supplement for sustained energy",
			"Optimize sleep hygiene for deeper recovery",
			"Stay consistent with your current healthy habits",
		],
		cta: {
			label: "Explore Optimization Tips",
			href: "/coffee-wellness",
		},
	},
};

const selected = $derived(answers[questions[step - 1]?.id] || "");

function select(value) {
	answers[questions[step - 1].id] = value;
}

function next() {
	if (step < 3) {
		step++;
	} else {
		step = 4;
	}
}

function prev() {
	if (step > 1) step--;
}

async function submitEmail() {
	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		emailError = "Please enter a valid email address.";
		return;
	}
	emailError = "";
	submitting = true;
	try {
		const formData = new FormData();
		formData.append("email", email);
		formData.append("quiz", JSON.stringify(answers));
		const res = await fetch("/api/subscribe", {
			method: "POST",
			body: formData,
		});
		if (!res.ok) throw new Error("Server error");
		emailSubmitted = true;
		computeResult();
	} catch {
		emailError = "Something went wrong. Please try again.";
	} finally {
		submitting = false;
	}
}

function computeResult() {
	const lowEnergy = answers.q1 === "low";
	const poorSleep = answers.q2 === "poor" || answers.q2 === "fair";
	const healthGoal = answers.q3;
	const issueCount = [
		answers.q1 === "low",
		answers.q2 === "poor" || answers.q2 === "fair",
	].filter(Boolean).length;
	if (issueCount >= 1 || healthGoal === "weight" || healthGoal === "energy") {
		result = resultTypes.metabolic_boost;
	} else {
		result = resultTypes.balanced;
	}
}

function restart() {
	step = 1;
	answers = { q1: "", q2: "", q3: "" };
	email = "";
	emailSubmitted = false;
	emailError = "";
	submitting = false;
	result = null;
}

function canAdvance() {
	if (step <= 3) return !!answers[questions[step - 1].id];
	return false;
}

const progress = $derived(
	step <= 3 ? Math.round(((step - 1) / 3) * 100) : step === 4 ? 85 : 100,
);

let advance = $derived(canAdvance());
</script>

<div class="max-w-xl mx-auto">
  {#if step <= 3}
    <div class="bg-surface dark:bg-surface-dark rounded-2xl shadow-xl border border-border dark:border-border-dark overflow-hidden">
      <div class="p-6 sm:p-8">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg sm:text-xl font-bold text-foreground dark:text-foreground-dark">
            Quick Metabolic Assessment
          </h3>
          <span class="text-xs font-medium text-muted dark:text-muted-dark tabular-nums">
            Step {step} of 3
          </span>
        </div>

        <div class="w-full h-2 bg-muted/10 dark:bg-muted-dark/10 rounded-full mb-6 overflow-hidden">
          <div
            class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style="width: {progress}%"
          ></div>
        </div>

        <div class="flex items-center justify-center gap-1 mb-8">
          {#each [1, 2, 3] as s}
            <button
              onclick={() => { if (s <= step) step = s; }}
              disabled={s > step}
              class="flex items-center gap-1.5 {s > step ? 'cursor-not-allowed' : 'cursor-pointer'}"
            >
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 {s < step ? 'bg-primary text-foreground-dark' : s === step ? 'bg-primary text-foreground-dark ring-4 ring-primary/20' : 'bg-muted/10 dark:bg-muted-dark/10 text-muted'}">
                {#if s < step}
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                {:else}
                  {s}
                {/if}
              </div>
            </button>
            {#if s < 3}
              <div class="w-12 sm:w-16 h-0.5 bg-border dark:bg-border-dark rounded-full overflow-hidden">
                <div class="h-full bg-primary transition-all duration-500" style="width: {s < step ? '100%' : '0%'}"></div>
              </div>
            {/if}
          {/each}
        </div>

        <div class="space-y-6">
          <div>
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl sm:text-3xl">{questions[step - 1].emoji}</span>
              <h4 class="text-lg sm:text-xl font-semibold text-foreground dark:text-foreground-dark leading-snug">
                {questions[step - 1].title}
              </h4>
            </div>
            <div class="space-y-3">
              {#each questions[step - 1].options as opt}
                <button
                  onclick={() => select(opt.value)}
                  class="w-full text-left p-4 sm:p-5 rounded-xl border-2 transition-all duration-200 group {selected === opt.value ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-md shadow-primary/10' : 'border-border dark:border-border-dark hover:border-muted dark:hover:border-muted-dark hover:bg-muted/5 dark:hover:bg-surface-dark/50'}"
                >
                  <span class="flex items-center gap-4">
                    <span class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 {selected === opt.value ? 'border-primary bg-primary' : 'border-muted dark:border-muted-dark group-hover:border-muted/60 dark:group-hover:border-muted-dark/60'}">
                      {#if selected === opt.value}
                        <svg class="w-3.5 h-3.5 text-foreground-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                      {/if}
                    </span>
                    <span class="text-sm sm:text-base font-medium {selected === opt.value ? 'text-primary dark:text-primary-light' : 'text-foreground dark:text-foreground-dark'}">
                      {opt.label}
                    </span>
                  </span>
                </button>
              {/each}
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-border dark:border-border-dark">
            <button
              onclick={prev}
              disabled={step === 1}
              class="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground dark:hover:text-foreground-dark transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <button
              onclick={next}
              disabled={!advance}
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 {advance ? 'bg-primary text-foreground-dark hover:bg-primary-dark shadow-lg shadow-primary/25' : 'bg-muted/10 dark:bg-muted-dark/10 text-muted cursor-not-allowed'}"
            >
              {step < 3 ? 'Continue' : 'See My Results'}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  {:else if step === 4}
    <div class="bg-surface dark:bg-surface-dark rounded-2xl shadow-xl border border-border dark:border-border-dark overflow-hidden">
      <div class="p-6 sm:p-10 text-center">
        <div class="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <svg class="w-8 h-8 text-foreground-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h3 class="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground-dark mb-2">
          Your Results Are Ready!
        </h3>
        <p class="text-muted dark:text-muted-dark max-w-md mx-auto mb-8">
          Enter your email to receive your personalized metabolic assessment and evidence-based recommendations tailored for adults over 40.
        </p>

        <form onsubmit={(e) => { e.preventDefault(); submitEmail(); }} class="max-w-sm mx-auto space-y-3">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              type="email"
              bind:value={email}
              placeholder="your@email.com"
              required
              class="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 bg-surface dark:bg-surface-dark text-foreground dark:text-foreground-dark placeholder-muted transition-all duration-200 {emailError ? 'border-error focus:border-error focus:ring-error/20' : 'border-border dark:border-border-dark focus:border-primary focus:ring-primary/20'} focus:outline-none focus:ring-4"
            />
          </div>
          {#if emailError}
            <p class="text-sm text-error text-left">{emailError}</p>
          {/if}
          <button
            type="submit"
            disabled={submitting}
            class="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-foreground-dark bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark transition-all duration-200 shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {#if submitting}
              <svg class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            {:else}
              Get My Free Results
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            {/if}
          </button>
        </form>

        <div class="mt-6 flex items-center justify-center gap-4 text-xs text-muted">
          <span class="inline-flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            No spam, unsubscribe anytime
          </span>
          <span class="inline-flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Your data is protected
          </span>
        </div>
      </div>
    </div>
  {:else}
    <div class="bg-surface dark:bg-surface-dark rounded-2xl shadow-xl border border-border dark:border-border-dark overflow-hidden">
      <div class="p-6 sm:p-10">
        <div class="text-center mb-8">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <svg class="w-8 h-8 text-foreground-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-2xl sm:text-3xl font-bold text-foreground dark:text-foreground-dark mb-2">
            Your Metabolic Assessment
          </h3>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold {result.badgeVariant === 'accent' ? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'}">
            {result.badge}
          </div>
          <p class="mt-1 text-sm font-semibold text-primary">
            {result.type}
          </p>
        </div>

        <div class="max-w-lg mx-auto space-y-6">
          <p class="text-sm sm:text-base text-muted dark:text-muted-dark leading-relaxed">
            {result.description}
          </p>

          <div class="bg-muted/5 dark:bg-surface-dark/50 rounded-xl p-5 space-y-3">
            <h4 class="text-sm font-bold text-foreground dark:text-foreground-dark uppercase tracking-wider">
              Recommended Next Steps
            </h4>
            <ul class="space-y-2.5">
              {#each result.recommendations as rec, i}
                <li class="flex items-start gap-3 text-sm text-muted dark:text-muted-dark">
                  <span class="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    {i + 1}
                  </span>
                  {rec}
                </li>
              {/each}
            </ul>
          </div>

          <div class="space-y-3">
            <a
              href={result.cta.href}
              class="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-base font-semibold text-foreground-dark bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark transition-all duration-200 shadow-lg shadow-primary/25 no-underline"
            >
              {result.cta.label}
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <button
              onclick={restart}
              class="flex items-center justify-center gap-1.5 w-full text-sm font-medium text-muted hover:text-foreground dark:hover:text-foreground-dark transition-colors py-2"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
