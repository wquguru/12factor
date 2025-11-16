import { PlaygroundScenario } from '../types';

export const intermediatePlayground: PlaygroundScenario[] = [
  {
    id: 'data-instruction-separation',
    title: 'playground.intermediate.dataInstructionSeparation.title',
    ui: {
      archetype: 'template',
      allowTemplate: true
    },
    examples: [
      {
        name: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.name',
        prompt: 'I will tell you the name of an animal. Please respond with the noise that animal makes. {{ANIMAL}}',
        systemPrompt: '',
        description: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.description',
        variations: [
          {
            name: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.variations.withXML.name',
            prompt: 'I will tell you the name of an animal. Please respond with the noise that animal makes.\n\n<animal>{{ANIMAL}}</animal>',
            systemPrompt: '',
            explanation: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.variations.withXML.explanation'
          },
          {
            name: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.variations.template.name',
            prompt: 'Tell me what sound a {{ANIMAL}} makes. Respond with just the sound.',
            systemPrompt: '',
            explanation: 'playground.intermediate.dataInstructionSeparation.examples.animalSounds.variations.template.explanation'
          }
        ]
      },
      {
        name: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.name',
        prompt: 'Please make this email more polite:\n\n<email>{{EMAIL}}</email>',
        systemPrompt: '',
        description: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.description',
        variations: [
          {
            name: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.variations.noXML.name',
            prompt: 'Please make this email more polite: {{EMAIL}}',
            systemPrompt: '',
            explanation: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.variations.noXML.explanation'
          },
          {
            name: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.variations.formal.name',
            prompt: 'Rewrite this email to be more formal and professional:\n\n<email>{{EMAIL}}</email>\n\nProvide only the rewritten email.',
            systemPrompt: '',
            explanation: 'playground.intermediate.dataInstructionSeparation.examples.emailRewrite.variations.formal.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.intermediate.dataInstructionSeparation.hints.0',
      'playground.intermediate.dataInstructionSeparation.hints.1',
      'playground.intermediate.dataInstructionSeparation.hints.2'
    ]
  },
  {
    id: 'output-formatting',
    title: 'playground.intermediate.outputFormatting.title',
    ui: {
      archetype: 'structured',
      allowTemplate: true,
      allowPrefill: true,
      expectedFormat: 'xml'
    },
    examples: [
      {
        name: 'playground.intermediate.outputFormatting.examples.haikuXML.name',
        prompt: 'Please write a haiku about {{TOPIC}}. Put it in <haiku> tags.',
        systemPrompt: '',
        description: 'playground.intermediate.outputFormatting.examples.haikuXML.description',
        variations: [
          {
            name: 'playground.intermediate.outputFormatting.examples.haikuXML.variations.prefilled.name',
            prompt: 'Please write a haiku about {{TOPIC}}. Put it in <haiku> tags.',
            systemPrompt: '',
            explanation: 'playground.intermediate.outputFormatting.examples.haikuXML.variations.prefilled.explanation'
          },
          {
            name: 'playground.intermediate.outputFormatting.examples.haikuXML.variations.json.name',
            prompt: 'Please write a haiku about {{TOPIC}}. Use JSON format with keys "first_line", "second_line", and "third_line".',
            systemPrompt: '',
            explanation: 'playground.intermediate.outputFormatting.examples.haikuXML.variations.json.explanation'
          }
        ]
      },
      {
        name: 'playground.intermediate.outputFormatting.examples.emailStyle.name',
        prompt: 'Here is an email: <email>{{EMAIL}}</email>. Make this email more {{STYLE}}. Write the new version in <{{STYLE}}_email> XML tags.',
        systemPrompt: '',
        description: 'playground.intermediate.outputFormatting.examples.emailStyle.description',
        variations: [
          {
            name: 'playground.intermediate.outputFormatting.examples.emailStyle.variations.formal.name',
            prompt: 'Make this email formal: <email>{{EMAIL}}</email>\n\nWrite in <formal_email> tags.',
            systemPrompt: '',
            explanation: 'playground.intermediate.outputFormatting.examples.emailStyle.variations.formal.explanation'
          },
          {
            name: 'playground.intermediate.outputFormatting.examples.emailStyle.variations.casual.name',
            prompt: 'Make this email casual: <email>{{EMAIL}}</email>\n\nWrite in <casual_email> tags.',
            systemPrompt: '',
            explanation: 'playground.intermediate.outputFormatting.examples.emailStyle.variations.casual.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.intermediate.outputFormatting.hints.0',
      'playground.intermediate.outputFormatting.hints.1',
      'playground.intermediate.outputFormatting.hints.2'
    ]
  },
  {
    id: 'step-by-step-thinking',
    title: 'playground.intermediate.stepByStepThinking.title',
    ui: {
      archetype: 'template',
      allowTemplate: true
    },
    examples: [
      {
        name: 'playground.intermediate.stepByStepThinking.examples.movieReview.name',
        prompt: 'Is this review sentiment positive or negative? First, write the best arguments for each side in <positive-argument> and <negative-argument> XML tags, then answer.\n\n{{REVIEW}}',
        systemPrompt: 'You are a savvy reader of movie reviews.',
        description: 'playground.intermediate.stepByStepThinking.examples.movieReview.description',
        variations: [
          {
            name: 'playground.intermediate.stepByStepThinking.examples.movieReview.variations.noThinking.name',
            prompt: 'Is this movie review sentiment positive or negative?\n\n{{REVIEW}}',
            systemPrompt: '',
            explanation: 'playground.intermediate.stepByStepThinking.examples.movieReview.variations.noThinking.explanation'
          },
          {
            name: 'playground.intermediate.stepByStepThinking.examples.movieReview.variations.brainstorm.name',
            prompt: 'Analyze this movie review. First brainstorm key sentiment indicators in <brainstorm> tags, then determine if positive or negative.\n\n{{REVIEW}}',
            systemPrompt: 'You are an expert in sentiment analysis.',
            explanation: 'playground.intermediate.stepByStepThinking.examples.movieReview.variations.brainstorm.explanation'
          }
        ]
      },
      {
        name: 'playground.intermediate.stepByStepThinking.examples.factChecking.name',
        prompt: 'Name a famous movie starring an actor who was born in the year {{YEAR}}. First brainstorm about some actors and their birth years in <brainstorm> tags, then give your answer.',
        systemPrompt: '',
        description: 'playground.intermediate.stepByStepThinking.examples.factChecking.description',
        variations: [
          {
            name: 'playground.intermediate.stepByStepThinking.examples.factChecking.variations.direct.name',
            prompt: 'Name a famous movie starring an actor who was born in the year {{YEAR}}.',
            systemPrompt: '',
            explanation: 'playground.intermediate.stepByStepThinking.examples.factChecking.variations.direct.explanation'
          },
          {
            name: 'playground.intermediate.stepByStepThinking.examples.factChecking.variations.detailed.name',
            prompt: 'Research actors born in {{YEAR}}. List 3-5 actors with their birth years, then choose one and name a famous movie they starred in.',
            systemPrompt: '',
            explanation: 'playground.intermediate.stepByStepThinking.examples.factChecking.variations.detailed.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.intermediate.stepByStepThinking.hints.0',
      'playground.intermediate.stepByStepThinking.hints.1',
      'playground.intermediate.stepByStepThinking.hints.2'
    ]
  },
  {
    id: 'few-shot-examples',
    title: 'playground.intermediate.fewShotExamples.title',
    ui: {
      archetype: 'few-shot',
      showExamplesPane: true
    },
    examples: [
      {
        name: 'playground.intermediate.fewShotExamples.examples.parentBot.name',
        prompt: 'Please complete the conversation by writing the next line, speaking as "A".\n\nQ: Is the tooth fairy real?\nA: Of course, sweetie. Wrap up your tooth and put it under your pillow tonight. There might be something waiting for you in the morning.\n\nQ: {{QUESTION}}',
        systemPrompt: '',
        description: 'playground.intermediate.fewShotExamples.examples.parentBot.description',
        variations: [
          {
            name: 'playground.intermediate.fewShotExamples.examples.parentBot.variations.noExample.name',
            prompt: '{{QUESTION}}',
            systemPrompt: 'You are a loving parent responding to a child\'s question.',
            explanation: 'playground.intermediate.fewShotExamples.examples.parentBot.variations.noExample.explanation'
          },
          {
            name: 'playground.intermediate.fewShotExamples.examples.parentBot.variations.multipleExamples.name',
            prompt: 'Complete the conversation as a loving parent:\n\nQ: Is the tooth fairy real?\nA: Of course! The tooth fairy loves to visit good children.\n\nQ: Why is the sky blue?\nA: That\'s a wonderful question! The sky looks blue because...\n\nQ: {{QUESTION}}',
            systemPrompt: '',
            explanation: 'playground.intermediate.fewShotExamples.examples.parentBot.variations.multipleExamples.explanation'
          }
        ]
      },
      {
        name: 'playground.intermediate.fewShotExamples.examples.dataExtraction.name',
        prompt: 'Extract individuals and their professions from the text in this format:\n\n<individuals>\n1. Dr. Liam Patel [NEUROSURGEON]\n2. Olivia Chen [ARCHITECT]\n</individuals>\n\nText: {{TEXT}}',
        systemPrompt: '',
        description: 'playground.intermediate.fewShotExamples.examples.dataExtraction.description',
        variations: [
          {
            name: 'playground.intermediate.fewShotExamples.examples.dataExtraction.variations.noFormat.name',
            prompt: 'List all the people and their jobs mentioned in this text:\n\n{{TEXT}}',
            systemPrompt: '',
            explanation: 'playground.intermediate.fewShotExamples.examples.dataExtraction.variations.noFormat.explanation'
          },
          {
            name: 'playground.intermediate.fewShotExamples.examples.dataExtraction.variations.jsonFormat.name',
            prompt: 'Extract people and professions as JSON:\n\n```json\n[\n  {"name": "Dr. Liam Patel", "profession": "neurosurgeon"},\n  {"name": "Olivia Chen", "profession": "architect"}\n]\n```\n\nText: {{TEXT}}',
            systemPrompt: '',
            explanation: 'playground.intermediate.fewShotExamples.examples.dataExtraction.variations.jsonFormat.explanation'
          }
        ]
      }
    ],
    hints: [
      'playground.intermediate.fewShotExamples.hints.0',
      'playground.intermediate.fewShotExamples.hints.1',
      'playground.intermediate.fewShotExamples.hints.2'
    ]
  }
];
