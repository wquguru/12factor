import { PlaygroundScenario } from '../types';

export const fundamentalsPlayground: PlaygroundScenario[] = [
  {
    id: 'playground-chapter-1',
    title: 'playground.fundamentals.basicStructure.title',
    ui: {
      archetype: 'basic',
      allowSystemPrompt: false,
      allowTemplate: false
    },
    examples: [
      {
        name: 'playground.fundamentals.basicStructure.creativeCounting.name',
        prompt: 'Count to five in a creative way',
        systemPrompt: '',
        description: 'playground.fundamentals.basicStructure.creativeCounting.description',
        variations: [
          {
            name: 'playground.fundamentals.basicStructure.creativeCounting.variations.basic',
            prompt: 'Count to five in a creative way',
            systemPrompt: '',
            explanation: 'playground.fundamentals.basicStructure.creativeCounting.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.creativeCounting.variations.storytelling',
            prompt: 'Count to five by telling a short story where each number appears naturally',
            systemPrompt: '',
            explanation: 'playground.fundamentals.basicStructure.creativeCounting.variations.storytellingExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.creativeCounting.variations.poetic',
            prompt: 'Count to five using rhymes or poetic language',
            systemPrompt: '',
            explanation: 'playground.fundamentals.basicStructure.creativeCounting.variations.poeticExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.creativeCounting.variations.withContext',
            prompt: 'Count to five in a creative way, making it educational for children',
            systemPrompt: 'You are a kindergarten teacher who makes learning fun and engaging.',
            explanation: 'playground.fundamentals.basicStructure.creativeCounting.variations.withContextExplanation'
          }
        ]
      },
      {
        name: 'playground.fundamentals.basicStructure.systemPromptExperiment.name',
        prompt: 'Explain what clouds are made of',
        systemPrompt: '',
        description: 'playground.fundamentals.basicStructure.systemPromptExperiment.description',
        variations: [
          {
            name: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.basic',
            prompt: 'Explain what clouds are made of',
            systemPrompt: '',
            explanation: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.structured',
            prompt: 'Explain what clouds are made of',
            systemPrompt: 'Please provide a clear, structured explanation.',
            explanation: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.structuredExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.detailed',
            prompt: 'Explain what clouds are made of',
            systemPrompt: 'Provide a detailed scientific explanation with examples.',
            explanation: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.detailedExplanation'
          },
          {
            name: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.simple',
            prompt: 'Explain what clouds are made of',
            systemPrompt: 'Explain in simple, easy-to-understand language.',
            explanation: 'playground.fundamentals.basicStructure.systemPromptExperiment.variations.simpleExplanation'
          }
        ]
      }
    ],
    hints: [
      'playground.fundamentals.basicStructure.hint1',
      'playground.fundamentals.basicStructure.hint2',
      'playground.fundamentals.basicStructure.hint3'
    ]
  },
  {
    id: 'playground-chapter-2',
    title: 'playground.fundamentals.clearCommunication.title',
    ui: {
      archetype: 'basic',
      allowSystemPrompt: false,
      allowTemplate: false
    },
    examples: [
      {
        name: 'playground.fundamentals.clearCommunication.languageExperiment.name',
        prompt: 'Greet me in the language of your choice and explain why you chose it',
        systemPrompt: '',
        description: 'playground.fundamentals.clearCommunication.languageExperiment.description',
        variations: [
          {
            name: 'playground.fundamentals.clearCommunication.languageExperiment.variations.basic',
            prompt: 'Greet me in the language of your choice and explain why you chose it',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.languageExperiment.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.languageExperiment.variations.specific',
            prompt: 'Greet me in Spanish and explain the cultural significance of your chosen greeting',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.languageExperiment.variations.specificExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.languageExperiment.variations.comparative',
            prompt: 'Greet me in two different languages and compare how greetings reflect cultural values',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.languageExperiment.variations.comparativeExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.languageExperiment.variations.contextual',
            prompt: 'Greet me appropriately for a business meeting and explain your choice',
            systemPrompt: 'You are a professional business consultant familiar with international etiquette.',
            explanation: 'playground.fundamentals.clearCommunication.languageExperiment.variations.contextualExplanation'
          }
        ]
      },
      {
        name: 'playground.fundamentals.clearCommunication.formatExperiment.name',
        prompt: 'List your top 3 favorite activities. Try different formatting styles.',
        systemPrompt: '',
        description: 'playground.fundamentals.clearCommunication.formatExperiment.description',
        variations: [
          {
            name: 'playground.fundamentals.clearCommunication.formatExperiment.variations.basic',
            prompt: 'List your top 3 favorite activities. Try different formatting styles.',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.formatExperiment.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.formatExperiment.variations.numbered',
            prompt: 'List your top 3 favorite activities in a numbered list with brief explanations for each',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.formatExperiment.variations.numberedExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.formatExperiment.variations.detailed',
            prompt: 'List your top 3 favorite activities with detailed descriptions and reasons why you enjoy them',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.formatExperiment.variations.detailedExplanation'
          },
          {
            name: 'playground.fundamentals.clearCommunication.formatExperiment.variations.creative',
            prompt: 'Present your top 3 favorite activities in a creative format (e.g., as a poem, story, or advertisement)',
            systemPrompt: '',
            explanation: 'playground.fundamentals.clearCommunication.formatExperiment.variations.creativeExplanation'
          }
        ]
      }
    ],
    hints: [
      'playground.fundamentals.clearCommunication.hint1',
      'playground.fundamentals.clearCommunication.hint2',
      'playground.fundamentals.clearCommunication.hint3'
    ]
  },
  {
    id: 'playground-chapter-3',
    title: 'playground.fundamentals.rolePrompting.title',
    ui: {
      archetype: 'role',
      allowSystemPrompt: true
    },
    examples: [
      {
        name: 'playground.fundamentals.rolePrompting.roleComparison.name',
        prompt: 'Should I invest in cryptocurrency?',
        systemPrompt: 'You are a conservative financial advisor with 20 years of experience.',
        description: 'playground.fundamentals.rolePrompting.roleComparison.description',
        variations: [
          {
            name: 'playground.fundamentals.rolePrompting.roleComparison.variations.basic',
            prompt: 'Should I invest in cryptocurrency?',
            systemPrompt: '',
            explanation: 'playground.fundamentals.rolePrompting.roleComparison.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.roleComparison.variations.conservative',
            prompt: 'Should I invest in cryptocurrency?',
            systemPrompt: 'You are a conservative financial advisor with 20 years of experience.',
            explanation: 'playground.fundamentals.rolePrompting.roleComparison.variations.conservativeExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.roleComparison.variations.aggressive',
            prompt: 'Should I invest in cryptocurrency?',
            systemPrompt: 'You are a tech-savvy investment advisor who specializes in emerging digital assets.',
            explanation: 'playground.fundamentals.rolePrompting.roleComparison.variations.aggressiveExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.roleComparison.variations.balanced',
            prompt: 'Should I invest in cryptocurrency? Please provide a balanced analysis.',
            systemPrompt: 'You are a certified financial planner who provides objective, balanced investment advice.',
            explanation: 'playground.fundamentals.rolePrompting.roleComparison.variations.balancedExplanation'
          }
        ]
      },
      {
        name: 'playground.fundamentals.rolePrompting.expertiseExperiment.name',
        prompt: 'Explain machine learning to me',
        systemPrompt: 'You are a data science professor who excels at making complex topics accessible.',
        description: 'playground.fundamentals.rolePrompting.expertiseExperiment.description',
        variations: [
          {
            name: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.basic',
            prompt: 'Explain machine learning to me',
            systemPrompt: '',
            explanation: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.basicExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.professor',
            prompt: 'Explain machine learning to me',
            systemPrompt: 'You are a data science professor who excels at making complex topics accessible.',
            explanation: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.professorExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.beginner',
            prompt: 'Explain machine learning to a complete beginner',
            systemPrompt: 'You are a friendly tutor who specializes in teaching technical concepts to absolute beginners.',
            explanation: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.beginnerExplanation'
          },
          {
            name: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.practical',
            prompt: 'Explain machine learning with real-world examples and applications',
            systemPrompt: 'You are a data scientist working in industry who likes to show practical applications.',
            explanation: 'playground.fundamentals.rolePrompting.expertiseExperiment.variations.practicalExplanation'
          }
        ]
      }
    ],
    hints: [
      'playground.fundamentals.rolePrompting.hint1',
      'playground.fundamentals.rolePrompting.hint2',
      'playground.fundamentals.rolePrompting.hint3'
    ]
  }
];
