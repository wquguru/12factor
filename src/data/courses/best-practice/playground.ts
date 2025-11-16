import { PlaygroundScenario } from '../types';

export const bestPracticePlayground: PlaygroundScenario[] = [
  {
    id: 'instruction-studio',
    title: 'playground.bestPractice.instructionStudio.title',
    ui: {
      archetype: 'structured',
      allowSystemPrompt: true,
      allowTemplate: true
    },
    examples: [
      {
        name: 'playground.bestPractice.instructionStudio.examples.analytics.name',
        prompt: 'Create an analytics dashboard for the weekly GTM leadership review. Include pipeline, cohort, and churn views, spotlight any anomalies, and propose 3 follow-up investigations. Go beyond the basics with drill-down interactions, alerting rules, and a QA checklist for data freshness.',
        description: 'playground.bestPractice.instructionStudio.examples.analytics.description',
        variations: [
          {
            name: 'playground.bestPractice.instructionStudio.examples.analytics.variations.lessEffective.name',
            prompt: 'Create an analytics dashboard.',
            explanation: 'playground.bestPractice.instructionStudio.examples.analytics.variations.lessEffective.explanation'
          },
          {
            name: 'playground.bestPractice.instructionStudio.examples.analytics.variations.contextRich.name',
            prompt: 'Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation. The dashboard is for Monday executive reviews, so highlight blockers, dependencies, and recommended owner follow-ups.',
            explanation: 'playground.bestPractice.instructionStudio.examples.analytics.variations.contextRich.explanation'
          }
        ]
      },
      {
        name: 'playground.bestPractice.instructionStudio.examples.formatting.name',
        prompt: 'Your response will be read aloud by a text-to-speech engine, so never use ellipses since the TTS will not know how to pronounce them. Answer with three short declarative sentences under 15 words each.',
        description: 'playground.bestPractice.instructionStudio.examples.formatting.description',
        variations: [
          {
            name: 'playground.bestPractice.instructionStudio.examples.formatting.variations.ruleOnly.name',
            prompt: 'NEVER use ellipses.',
            explanation: 'playground.bestPractice.instructionStudio.examples.formatting.variations.ruleOnly.explanation'
          },
          {
            name: 'playground.bestPractice.instructionStudio.examples.formatting.variations.contextual.name',
            prompt: 'Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.',
            explanation: 'playground.bestPractice.instructionStudio.examples.formatting.variations.contextual.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.bestPractice.instructionStudio.hints.0',
      'playground.bestPractice.instructionStudio.hints.1',
      'playground.bestPractice.instructionStudio.hints.2'
    ]
  },
  {
    id: 'workflow-director',
    title: 'playground.bestPractice.workflowDirector.title',
    ui: {
      archetype: 'chaining',
      allowPrefill: true,
      allowTemplate: true,
      allowChaining: true
    },
    examples: [
      {
        name: 'playground.bestPractice.workflowDirector.examples.contextMemo.name',
        prompt: 'Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns. As you approach your token budget limit, save your current progress and state to memory before the context window refreshes. Always be as persistent and autonomous as possible and complete tasks fully, even if the end of your budget is approaching. Never artificially stop any task early regardless of the context remaining.',
        description: 'playground.bestPractice.workflowDirector.examples.contextMemo.description',
        variations: [
          {
            name: 'playground.bestPractice.workflowDirector.examples.contextMemo.variations.wrapUp.name',
            prompt: 'If you sense the context limit is near, summarize quickly and end the task.',
            explanation: 'playground.bestPractice.workflowDirector.examples.contextMemo.variations.wrapUp.explanation'
          },
          {
            name: 'playground.bestPractice.workflowDirector.examples.contextMemo.variations.memoryFirst.name',
            prompt: 'As the context window compacts, write checkpoints to progress.txt, persist todos, then continue seamlessly.',
            explanation: 'playground.bestPractice.workflowDirector.examples.contextMemo.variations.memoryFirst.explanation'
          }
        ]
      },
      {
        name: 'playground.bestPractice.workflowDirector.examples.researchLoop.name',
        prompt: 'Search for this information in a structured way. As you gather data, develop several competing hypotheses. Track your confidence levels in your progress notes to improve calibration. Regularly self-critique your approach and plan. Update a hypothesis tree or research notes file to persist information and provide transparency. Break down this complex research task systematically.',
        description: 'playground.bestPractice.workflowDirector.examples.researchLoop.description',
        variations: [
          {
            name: 'playground.bestPractice.workflowDirector.examples.researchLoop.variations.openEnded.name',
            prompt: 'Can you look up AI developer onboarding best practices?',
            explanation: 'playground.bestPractice.workflowDirector.examples.researchLoop.variations.openEnded.explanation'
          },
          {
            name: 'playground.bestPractice.workflowDirector.examples.researchLoop.variations.instrumented.name',
            prompt: '<success>Define success criteria first.</success>\n<hypotheses>Maintain a ranked list with confidence scores.</hypotheses>\n<verification>Verify every claim with at least two sources.</verification>\n<notes>Keep progress notes and tag TODOs.</notes>',
            explanation: 'playground.bestPractice.workflowDirector.examples.researchLoop.variations.instrumented.explanation'
          }
        ],
        ui: {
          archetype: 'chaining',
          allowTemplate: true,
          allowPrefill: true,
          expectedFormat: 'xml'
        }
      }
    ],
    hints: [
      'playground.bestPractice.workflowDirector.hints.0',
      'playground.bestPractice.workflowDirector.hints.1',
      'playground.bestPractice.workflowDirector.hints.2'
    ]
  }
];
