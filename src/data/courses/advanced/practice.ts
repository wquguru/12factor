import { PracticeExample } from '../types';

export const advancedPractice: PracticeExample[] = [
  {
    id: 'chapter8-give-an-out',
    title: 'practiceExercises.advanced.chapter8GiveAnOut.title',
    description: 'practiceExercises.advanced.chapter8GiveAnOut.description',
    userPrompt: "How many solo studio albums has Beyoncé released? Provide the count and cite your source.",
    expectedOutput: 'practiceExercises.advanced.chapter8GiveAnOut.expectedOutput',
    hints: [
      'practiceExercises.advanced.chapter8GiveAnOut.hints.0',
      'practiceExercises.advanced.chapter8GiveAnOut.hints.1',
      'practiceExercises.advanced.chapter8GiveAnOut.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.advanced.chapter8GiveAnOut.variations.noOut.name',
        prompt: "How many solo studio albums has Beyoncé released?",
        explanation: 'practiceExercises.advanced.chapter8GiveAnOut.variations.noOut.explanation'
      },
      {
        name: 'practiceExercises.advanced.chapter8GiveAnOut.variations.allowUnknown.name',
        prompt: "If you are not certain, say you don't know. How many solo studio albums has Beyoncé released?",
        explanation: 'practiceExercises.advanced.chapter8GiveAnOut.variations.allowUnknown.explanation'
      }
    ],
    ui: { archetype: 'template', allowTemplate: true }
  },
  {
    id: 'chapter8-cite-evidence',
    title: 'practiceExercises.advanced.chapter8CiteEvidence.title',
    description: 'practiceExercises.advanced.chapter8CiteEvidence.description',
    userPrompt: 'Use the document below to answer the question. Extract supporting quotes before answering. {{DOCUMENT}}',
    expectedOutput: 'practiceExercises.advanced.chapter8CiteEvidence.expectedOutput',
    hints: [
      'practiceExercises.advanced.chapter8CiteEvidence.hints.0',
      'practiceExercises.advanced.chapter8CiteEvidence.hints.1',
      'practiceExercises.advanced.chapter8CiteEvidence.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.advanced.chapter8CiteEvidence.variations.noQuotes.name',
        prompt: 'Read the prospectus excerpt and answer the question about subscriber growth.',
        explanation: 'practiceExercises.advanced.chapter8CiteEvidence.variations.noQuotes.explanation'
      },
      {
        name: 'practiceExercises.advanced.chapter8CiteEvidence.variations.quoteFirst.name',
        prompt: 'First extract any relevant numbers from the text, then answer the question about subscriber growth.',
        explanation: 'practiceExercises.advanced.chapter8CiteEvidence.variations.quoteFirst.explanation'
      }
    ],
    ui: { archetype: 'template', allowTemplate: true, allowPrefill: true, expectedFormat: 'xml' }
  },
  {
    id: 'chapter9-blueprint',
    title: 'practiceExercises.advanced.chapter9Blueprint.title',
    description: 'practiceExercises.advanced.chapter9Blueprint.description',
    systemPrompt: '',
    userPrompt: 'Build a prompt blueprint for a friendly career coach chatbot following these sections: Role, Goals, Guardrails, Workflow, Output Format.',
    expectedOutput: 'practiceExercises.advanced.chapter9Blueprint.expectedOutput',
    hints: [
      'practiceExercises.advanced.chapter9Blueprint.hints.0',
      'practiceExercises.advanced.chapter9Blueprint.hints.1',
      'practiceExercises.advanced.chapter9Blueprint.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.advanced.chapter9Blueprint.variations.generic.name',
        prompt: 'Create a prompt for a helpful assistant.',
        explanation: 'practiceExercises.advanced.chapter9Blueprint.variations.generic.explanation'
      },
      {
        name: 'practiceExercises.advanced.chapter9Blueprint.variations.structured.name',
        prompt: 'Fill in the blueprint template for a friendly career coach as described above.',
        explanation: 'practiceExercises.advanced.chapter9Blueprint.variations.structured.explanation'
      }
    ],
    ui: { archetype: 'structured', allowTemplate: true, allowPrefill: true, expectedFormat: 'xml' }
  },
  {
    id: 'chapter10-chaining-tools',
    title: 'practiceExercises.advanced.chapter10Chaining.title',
    description: 'practiceExercises.advanced.chapter10Chaining.description',
    userPrompt: 'Design a two-step workflow: brainstorm answers, then use a calculator tool to verify the numeric result before replying.',
    expectedOutput: 'practiceExercises.advanced.chapter10Chaining.expectedOutput',
    hints: [
      'practiceExercises.advanced.chapter10Chaining.hints.0',
      'practiceExercises.advanced.chapter10Chaining.hints.1',
      'practiceExercises.advanced.chapter10Chaining.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.advanced.chapter10Chaining.variations.singleShot.name',
        prompt: 'Answer the math question directly.',
        explanation: 'practiceExercises.advanced.chapter10Chaining.variations.singleShot.explanation'
      },
      {
        name: 'practiceExercises.advanced.chapter10Chaining.variations.chainAndTool.name',
        prompt: 'First think in <analysis> tags, then call the calculator tool, then answer in <final> tags.',
        explanation: 'practiceExercises.advanced.chapter10Chaining.variations.chainAndTool.explanation'
      }
    ],
    ui: { archetype: 'chaining', allowChaining: true, allowPrefill: true, expectedFormat: 'xml' }
  }
];
