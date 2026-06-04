import type { QuizQuestion, QuizResult } from './types';

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: 'How would you describe your energy levels throughout a typical day?',
    answers: [
      { text: 'Steady and consistent from morning to night', score: 15 },
      { text: 'Good in the morning, but I crash mid-afternoon', score: 10 },
      { text: 'Fluctuating — ups and downs throughout the day', score: 5 },
      { text: 'Chronically fatigued regardless of sleep', score: 0 },
    ],
  },
  {
    id: 2,
    text: 'How many hours of quality sleep do you average per night?',
    answers: [
      { text: '7-8 hours — I wake up feeling rested', score: 15 },
      { text: '6-7 hours — decent but not always restorative', score: 10 },
      { text: '5-6 hours — I often feel tired', score: 5 },
      { text: 'Less than 5 hours — sleep is a struggle', score: 0 },
    ],
  },
  {
    id: 3,
    text: 'How often do you consume processed foods or added sugars?',
    answers: [
      { text: 'Rarely — I prioritize whole, unprocessed foods', score: 15 },
      { text: 'Occasionally — 1-2 times per week', score: 10 },
      { text: 'Frequently — 3-5 times per week', score: 5 },
      { text: 'Daily — processed foods are a staple', score: 0 },
    ],
  },
  {
    id: 4,
    text: 'How would you describe your current stress levels?',
    answers: [
      { text: 'Well-managed — stress rarely affects me', score: 15 },
      { text: 'Occasionally high — manageable most days', score: 10 },
      { text: 'Frequently high — stress is a constant companion', score: 5 },
      { text: 'Chronically high — it\'s affecting my health', score: 0 },
    ],
  },
  {
    id: 5,
    text: 'How often do you engage in physical activity or exercise?',
    answers: [
      { text: '4+ times per week — I\'m consistent', score: 15 },
      { text: '2-3 times per week — fairly regular', score: 10 },
      { text: 'Once per week — inconsistent', score: 5 },
      { text: 'Rarely — exercise isn\'t part of my routine', score: 0 },
    ],
  },
  {
    id: 6,
    text: 'How would you describe your weight over the past year?',
    answers: [
      { text: 'Stable at a healthy weight', score: 15 },
      { text: 'Minor fluctuations (3-5 lbs)', score: 10 },
      { text: 'Gradual weight gain (5-15 lbs)', score: 5 },
      { text: 'Significant weight changes or concerns', score: 0 },
    ],
  },
  {
    id: 7,
    text: 'How often do you experience food cravings or hunger between meals?',
    answers: [
      { text: 'Rarely — I feel satisfied after meals', score: 15 },
      { text: 'Occasionally — especially in the afternoon', score: 10 },
      { text: 'Frequently — I snack throughout the day', score: 5 },
      { text: 'Constantly — cravings are hard to control', score: 0 },
    ],
  },
  {
    id: 8,
    text: 'How would you rate your digestive health?',
    answers: [
      { text: 'Excellent — no issues', score: 15 },
      { text: 'Good — occasional minor discomfort', score: 10 },
      { text: 'Fair — frequent bloating or irregularity', score: 5 },
      { text: 'Poor — chronic digestive issues', score: 0 },
    ],
  },
];

export const results: QuizResult[] = [
  {
    minScore: 80,
    maxScore: 100,
    title: 'Metabolic Optimizer',
    description: 'Your metabolic health is in strong shape. You have solid foundations in place across sleep, nutrition, activity, and stress management. Your path forward is about fine-tuning and optimization rather than overhaul.',
    traits: [
      'Good energy regulation throughout the day',
      'Healthy sleep patterns and recovery',
      'Balanced nutrition habits',
      'Active lifestyle',
    ],
    cta: {
      label: 'Read Our Optimization Guide',
      href: '/metabolic-wellness/coffee-metabolism/7-ingredients-boost-coffee-metabolism',
    },
  },
  {
    minScore: 60,
    maxScore: 79,
    title: 'Metabolic Builder',
    description: 'You have a good metabolic foundation with several areas performing well. A few key adjustments — particularly in sleep consistency, stress management, or nutrition timing — could significantly improve your energy and metabolic efficiency.',
    traits: [
      'Decent but inconsistent energy',
      'Some healthy habits in place',
      'Room for improvement in 1-2 key areas',
      'Good awareness of your health',
    ],
    cta: {
      label: 'Build Your Morning Routine',
      href: '/daily-energy-optimization/daily-routines/morning-routine-energy-boost',
    },
  },
  {
    minScore: 40,
    maxScore: 59,
    title: 'Metabolic Improver',
    description: 'Your metabolic health has room for improvement. Focusing on foundational habits — consistent sleep, stress reduction, and nutrition quality — will create the biggest impact. Start with one habit at a time rather than trying to change everything at once.',
    traits: [
      'Frequent energy fluctuations',
      'Inconsistent sleep patterns',
      'Nutrition could use attention',
      'Stress may be impacting your health',
    ],
    cta: {
      label: 'Start with Small Changes',
      href: '/sustainable-healthy-habits/micro-habits/small-changes-big-impact',
    },
  },
  {
    minScore: 0,
    maxScore: 39,
    title: 'Metabolic Reset',
    description: 'Your metabolic health needs attention, but the good news is that even small changes can produce significant improvements. Focus on the fundamentals: prioritize sleep, reduce processed foods, manage stress, and incorporate consistent movement. The 7-Day Metabolic Reset guide is designed specifically for this starting point.',
    traits: [
      'Chronic fatigue or low energy',
      'Sleep quality needs significant improvement',
      'Nutrition and stress are major factors',
      'Ready for a fresh start',
    ],
    cta: {
      label: 'Get the 7-Day Metabolic Reset',
      href: '/lead-magnets/7-day-metabolic-reset',
    },
  },
];
