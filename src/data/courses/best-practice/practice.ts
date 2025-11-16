import { PracticeExample } from '../types';

export const bestPracticePractice: PracticeExample[] = [
  {
    id: 'clarity-brief',
    title: 'practiceExercises.bestPractice.clarityBrief.title',
    description: 'practiceExercises.bestPractice.clarityBrief.description',
    userPrompt: 'Rewrite the following vague instruction so Claude Sonnet 4.5 knows exactly what to build. Include deliverables, stretch goals, and guardrails.\n\nOriginal request: "Create an analytics dashboard."',
    expectedOutput: 'practiceExercises.bestPractice.clarityBrief.expectedOutput',
    hints: [
      'practiceExercises.bestPractice.clarityBrief.hints.0',
      'practiceExercises.bestPractice.clarityBrief.hints.1',
      'practiceExercises.bestPractice.clarityBrief.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.bestPractice.clarityBrief.variations.baseline.name',
        prompt: 'Create an analytics dashboard.',
        explanation: 'practiceExercises.bestPractice.clarityBrief.variations.baseline.explanation'
      },
      {
        name: 'practiceExercises.bestPractice.clarityBrief.variations.bestPractice.name',
        prompt: 'Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.',
        explanation: 'practiceExercises.bestPractice.clarityBrief.variations.bestPractice.explanation'
      }
    ],
    ui: { archetype: 'structured', allowTemplate: true, allowSystemPrompt: true }
  },
  {
    id: 'context-budget-memo',
    title: 'practiceExercises.bestPractice.contextMemo.title',
    description: 'practiceExercises.bestPractice.contextMemo.description',
    userPrompt: 'Draft a system message for Claude Sonnet 4.5 explaining how your agent harness compacts context automatically. Instruct it to save progress before refresh, never stop early, and explain why persistence matters.',
    expectedOutput: 'practiceExercises.bestPractice.contextMemo.expectedOutput',
    hints: [
      'practiceExercises.bestPractice.contextMemo.hints.0',
      'practiceExercises.bestPractice.contextMemo.hints.1',
      'practiceExercises.bestPractice.contextMemo.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.bestPractice.contextMemo.variations.panic.name',
        prompt: 'As you approach your token limit, wrap up quickly.',
        explanation: 'practiceExercises.bestPractice.contextMemo.variations.panic.explanation'
      },
      {
        name: 'practiceExercises.bestPractice.contextMemo.variations.memoryAware.name',
        prompt: 'Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns. As you approach your token budget limit, save your current progress and state to memory before the context window refreshes. Always be as persistent and autonomous as possible and complete tasks fully, even if the end of your budget is approaching. Never artificially stop any task early regardless of the context remaining.',
        explanation: 'practiceExercises.bestPractice.contextMemo.variations.memoryAware.explanation'
      }
    ],
    ui: { archetype: 'structured', allowSystemPrompt: true }
  },
  {
    id: 'structured-research-loop',
    title: 'practiceExercises.bestPractice.researchLoop.title',
    description: 'practiceExercises.bestPractice.researchLoop.description',
    userPrompt: 'Write a prompt instructing Claude Sonnet 4.5 to research "AI developer onboarding" using structured hypotheses, multiple sources, verification, and progress notes.',
    expectedOutput: 'practiceExercises.bestPractice.researchLoop.expectedOutput',
    hints: [
      'practiceExercises.bestPractice.researchLoop.hints.0',
      'practiceExercises.bestPractice.researchLoop.hints.1',
      'practiceExercises.bestPractice.researchLoop.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.bestPractice.researchLoop.variations.openEnded.name',
        prompt: 'Can you research AI developer onboarding?',
        explanation: 'practiceExercises.bestPractice.researchLoop.variations.openEnded.explanation'
      },
      {
        name: 'practiceExercises.bestPractice.researchLoop.variations.structured.name',
        prompt: 'Search for this information in a structured way. As you gather data, develop several competing hypotheses. Track your confidence levels in your progress notes to improve calibration. Regularly self-critique your approach and plan. Update a hypothesis tree or research notes file to persist information and provide transparency. Break down this complex research task systematically.',
        explanation: 'practiceExercises.bestPractice.researchLoop.variations.structured.explanation'
      }
    ],
    ui: { archetype: 'chaining', allowPrefill: true, allowTemplate: true }
  }
];
