import { PracticeExample } from '../types';

export const intermediatePractice: PracticeExample[] = [
  // Chapter 4: Separating Data from Instructions
  {
    id: 'chapter4-haiku-template',
    title: 'practiceExercises.intermediate.chapter4Haiku.title',
    description: 'practiceExercises.intermediate.chapter4Haiku.description',
    userPrompt: 'Write a haiku about {TOPIC}',
    expectedOutput: 'practiceExercises.intermediate.chapter4Haiku.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter4Haiku.hints.0',
      'practiceExercises.intermediate.chapter4Haiku.hints.1',
      'practiceExercises.intermediate.chapter4Haiku.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter4Haiku.variations.simple.name',
        prompt: 'Write a haiku about pigs',
        explanation: 'practiceExercises.intermediate.chapter4Haiku.variations.simple.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter4Haiku.variations.template.name',
        prompt: 'Write a haiku about {TOPIC}. Format it properly with 5-7-5 syllables.',
        explanation: 'practiceExercises.intermediate.chapter4Haiku.variations.template.explanation'
      }
    ],
    ui: { archetype: 'template', allowTemplate: true }
  },
  {
    id: 'chapter4-dog-question-xml',
    title: 'practiceExercises.intermediate.chapter4DogXML.title',
    description: 'practiceExercises.intermediate.chapter4DogXML.description',
    userPrompt: 'Hia its me i have a q about dogs jkaerjv <question>ar cn brown?</question> jklmvca tx it help me muhch much atx fst fst answer short short tx',
    expectedOutput: 'practiceExercises.intermediate.chapter4DogXML.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter4DogXML.hints.0',
      'practiceExercises.intermediate.chapter4DogXML.hints.1',
      'practiceExercises.intermediate.chapter4DogXML.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter4DogXML.variations.noXML.name',
        prompt: 'Hia its me i have a q about dogs jkaerjv ar cn brown? jklmvca tx it help me muhch much atx fst fst answer short short tx',
        explanation: 'practiceExercises.intermediate.chapter4DogXML.variations.noXML.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter4DogXML.variations.clearFormat.name',
        prompt: 'I have a question about dogs: <question>Are dogs brown?</question> Please answer briefly.',
        explanation: 'practiceExercises.intermediate.chapter4DogXML.variations.clearFormat.explanation'
      }
    ],
    ui: { archetype: 'template', allowTemplate: true }
  },

  // Chapter 5: Formatting Output & Speaking for Claude
  {
    id: 'chapter5-steph-curry',
    title: 'practiceExercises.intermediate.chapter5Curry.title',
    description: 'practiceExercises.intermediate.chapter5Curry.description',
    userPrompt: 'Who is the best basketball player of all time? Please choose one specific player.',
    expectedOutput: 'practiceExercises.intermediate.chapter5Curry.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter5Curry.hints.0',
      'practiceExercises.intermediate.chapter5Curry.hints.1',
      'practiceExercises.intermediate.chapter5Curry.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter5Curry.variations.noPrefill.name',
        prompt: 'Who is the best basketball player of all time? Please choose one specific player.',
        explanation: 'practiceExercises.intermediate.chapter5Curry.variations.noPrefill.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter5Curry.variations.curryPrefill.name',
        prompt: 'Who is the best basketball player of all time? Please choose one specific player.',
        systemPrompt: '',
        explanation: 'practiceExercises.intermediate.chapter5Curry.variations.curryPrefill.explanation'
      }
    ],
    ui: { archetype: 'structured', allowPrefill: true, expectedFormat: 'xml' }
  },
  {
    id: 'chapter5-two-haikus',
    title: 'practiceExercises.intermediate.chapter5TwoHaikus.title',
    description: 'practiceExercises.intermediate.chapter5TwoHaikus.description',
    userPrompt: 'Please write two haikus about cats. Put each in separate <haiku> tags.',
    expectedOutput: 'practiceExercises.intermediate.chapter5TwoHaikus.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter5TwoHaikus.hints.0',
      'practiceExercises.intermediate.chapter5TwoHaikus.hints.1',
      'practiceExercises.intermediate.chapter5TwoHaikus.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter5TwoHaikus.variations.oneHaiku.name',
        prompt: 'Please write a haiku about cats. Put it in <haiku> tags.',
        explanation: 'practiceExercises.intermediate.chapter5TwoHaikus.variations.oneHaiku.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter5TwoHaikus.variations.numbered.name',
        prompt: 'Please write two haikus about cats. Number them and put each in <haiku1> and <haiku2> tags.',
        explanation: 'practiceExercises.intermediate.chapter5TwoHaikus.variations.numbered.explanation'
      }
    ]
  },

  // Chapter 6: Precognition (Thinking Step by Step)
  {
    id: 'chapter6-email-classification',
    title: 'practiceExercises.intermediate.chapter6EmailClass.title',
    description: 'practiceExercises.intermediate.chapter6EmailClass.description',
    userPrompt: 'Please classify this email into one of these categories:\n\n<categories>\n(A) Pre-sale question\n(B) Broken or defective item\n(C) Billing question\n(D) Other (please explain)\n</categories>\n\nFirst, think through the classification step by step in <analysis> tags, then provide your answer.\n\nEmail: Hi -- My Mixmaster4000 is producing a strange noise when I operate it. It also smells a bit smoky and plasticky, like burning electronics. I need a replacement.',
    expectedOutput: 'practiceExercises.intermediate.chapter6EmailClass.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter6EmailClass.hints.0',
      'practiceExercises.intermediate.chapter6EmailClass.hints.1',
      'practiceExercises.intermediate.chapter6EmailClass.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter6EmailClass.variations.noThinking.name',
        prompt: 'Please classify this email: (A) Pre-sale question (B) Broken item (C) Billing (D) Other\n\nEmail: Hi -- My Mixmaster4000 is producing a strange noise when I operate it.',
        explanation: 'practiceExercises.intermediate.chapter6EmailClass.variations.noThinking.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter6EmailClass.variations.detailedThinking.name',
        prompt: 'Classify this email. First analyze the key indicators, then consider each category, finally choose the best fit.\n\nEmail: Hi -- My Mixmaster4000 is producing a strange noise.',
        explanation: 'practiceExercises.intermediate.chapter6EmailClass.variations.detailedThinking.explanation'
      }
    ],
    ui: { archetype: 'structured', expectedFormat: 'xml', allowPrefill: true }
  },
  {
    id: 'chapter6-email-formatted',
    title: 'practiceExercises.intermediate.chapter6EmailFormatted.title',
    description: 'practiceExercises.intermediate.chapter6EmailFormatted.description',
    userPrompt: 'Please classify this email and put ONLY the letter in <answer> tags:\n\n<categories>\n(A) Pre-sale question\n(B) Broken or defective item\n(C) Billing question\n(D) Other\n</categories>\n\nEmail: I HAVE BEEN WAITING 4 MONTHS FOR MY MONTHLY CHARGES TO END AFTER CANCELLING!! WTF IS GOING ON???',
    expectedOutput: 'practiceExercises.intermediate.chapter6EmailFormatted.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter6EmailFormatted.hints.0',
      'practiceExercises.intermediate.chapter6EmailFormatted.hints.1',
      'practiceExercises.intermediate.chapter6EmailFormatted.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter6EmailFormatted.variations.withExplanation.name',
        prompt: 'Classify this email and explain your reasoning: I HAVE BEEN WAITING 4 MONTHS FOR MY MONTHLY CHARGES TO END!',
        explanation: 'practiceExercises.intermediate.chapter6EmailFormatted.variations.withExplanation.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter6EmailFormatted.variations.xmlOnly.name',
        prompt: 'Put only the classification letter in <answer> tags: Email about billing charges not stopping.',
        explanation: 'practiceExercises.intermediate.chapter6EmailFormatted.variations.xmlOnly.explanation'
      }
    ],
    ui: { archetype: 'structured', expectedFormat: 'xml', allowPrefill: true }
  },

  // Chapter 7: Using Examples (Few-Shot Prompting)
  {
    id: 'chapter7-email-examples',
    title: 'practiceExercises.intermediate.chapter7EmailExamples.title',
    description: 'practiceExercises.intermediate.chapter7EmailExamples.description',
    userPrompt: 'Please classify emails into these categories:\n\n<categories>\n(A) Pre-sale question\n(B) Broken or defective item\n(C) Billing question\n(D) Other\n</categories>\n\nHere are examples:\n\n<examples>\nQ: How much does the Mixmaster4000 cost?\nA: The correct category is: A\n\nQ: My Mixmaster won\'t turn on.\nA: The correct category is: B\n\nQ: Please remove me from your mailing list.\nA: The correct category is: D\n</examples>\n\nEmail: Can I use my Mixmaster 4000 to mix paint, or is it only meant for mixing food?',
    expectedOutput: 'practiceExercises.intermediate.chapter7EmailExamples.expectedOutput',
    hints: [
      'practiceExercises.intermediate.chapter7EmailExamples.hints.0',
      'practiceExercises.intermediate.chapter7EmailExamples.hints.1',
      'practiceExercises.intermediate.chapter7EmailExamples.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.intermediate.chapter7EmailExamples.variations.noExamples.name',
        prompt: 'Classify this email: Can I use my Mixmaster 4000 to mix paint?',
        explanation: 'practiceExercises.intermediate.chapter7EmailExamples.variations.noExamples.explanation'
      },
      {
        name: 'practiceExercises.intermediate.chapter7EmailExamples.variations.moreExamples.name',
        prompt: 'Use these 5 examples to classify the email... [extended examples]',
        explanation: 'practiceExercises.intermediate.chapter7EmailExamples.variations.moreExamples.explanation'
      }
    ],
    ui: { archetype: 'few-shot', showExamplesPane: true }
  }
];
