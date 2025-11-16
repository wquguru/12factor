import { PracticeExample } from '../types';

export const fundamentalsPractice: PracticeExample[] = [
  {
    id: 'chapter1-basic-structure',
    title: 'practiceExercises.fundamentals.chapter1BasicStructure.title',
    description: 'practiceExercises.fundamentals.chapter1BasicStructure.description',
    ui: {
      archetype: 'basic'
    },
    userPrompt: 'Count to three',
    expectedOutput: 'practiceExercises.fundamentals.chapter1BasicStructure.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter1BasicStructure.hints.0',
      'practiceExercises.fundamentals.chapter1BasicStructure.hints.1',
      'practiceExercises.fundamentals.chapter1BasicStructure.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter1BasicStructure.variations.directInstruction.name',
        prompt: 'Count to three',
        explanation: 'practiceExercises.fundamentals.chapter1BasicStructure.variations.directInstruction.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter1BasicStructure.variations.clearFormat.name',
        prompt: 'Please count from 1 to 3, one number per line.',
        explanation: 'practiceExercises.fundamentals.chapter1BasicStructure.variations.clearFormat.explanation'
      }
    ]
  },
  {
    id: 'chapter1-system-prompt',
    title: 'practiceExercises.fundamentals.chapter1SystemPrompt.title',
    description: 'practiceExercises.fundamentals.chapter1SystemPrompt.description',
    ui: {
      archetype: 'role',
      allowSystemPrompt: true
    },
    systemPrompt: 'You are a 3 year old child. Respond with the excitement, curiosity, and simple language that a 3-year-old would use.',
    userPrompt: 'How big is the sky?',
    expectedOutput: 'practiceExercises.fundamentals.chapter1SystemPrompt.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter1SystemPrompt.hints.0',
      'practiceExercises.fundamentals.chapter1SystemPrompt.hints.1',
      'practiceExercises.fundamentals.chapter1SystemPrompt.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.noSystemPrompt.name',
        prompt: 'How big is the sky?',
        systemPrompt: '',
        explanation: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.noSystemPrompt.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.strictScientist.name',
        prompt: 'How big is the sky?',
        systemPrompt: '你是一个严格的物理学家。给出精确的科学答案。',
        explanation: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.strictScientist.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.friendlyTeacher.name',
        prompt: 'How big is the sky?',
        systemPrompt: 'You are a friendly elementary school teacher. Explain things in a warm, encouraging way that children can understand.',
        explanation: 'practiceExercises.fundamentals.chapter1SystemPrompt.variations.friendlyTeacher.explanation'
      }
    ]
  },
  {
    id: 'chapter2-spanish',
    title: 'practiceExercises.fundamentals.chapter2Spanish.title',
    description: 'practiceExercises.fundamentals.chapter2Spanish.description',
    userPrompt: 'Hello Claude, how are you? Please respond in Spanish.',
    expectedOutput: 'practiceExercises.fundamentals.chapter2Spanish.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter2Spanish.hints.0',
      'practiceExercises.fundamentals.chapter2Spanish.hints.1',
      'practiceExercises.fundamentals.chapter2Spanish.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter2Spanish.variations.frenchResponse.name',
        prompt: 'Hello Claude, how are you? Please respond in French.',
        explanation: 'practiceExercises.fundamentals.chapter2Spanish.variations.frenchResponse.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter2Spanish.variations.bilingualResponse.name',
        prompt: 'Hello Claude, how are you? Please respond in both English and Spanish.',
        explanation: 'practiceExercises.fundamentals.chapter2Spanish.variations.bilingualResponse.explanation'
      }
    ],
    ui: { archetype: 'basic' }
  },
  {
    id: 'chapter2-basketball',
    title: 'practiceExercises.fundamentals.chapter2Basketball.title',
    description: 'practiceExercises.fundamentals.chapter2Basketball.description',
    userPrompt: 'Who is the best basketball player of all time? Give me only the name, no other text.',
    expectedOutput: 'practiceExercises.fundamentals.chapter2Basketball.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter2Basketball.hints.0',
      'practiceExercises.fundamentals.chapter2Basketball.hints.1',
      'practiceExercises.fundamentals.chapter2Basketball.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter2Basketball.variations.withExplanation.name',
        prompt: 'Who is the best basketball player of all time?',
        explanation: 'practiceExercises.fundamentals.chapter2Basketball.variations.withExplanation.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter2Basketball.variations.top3List.name',
        prompt: 'List the top 3 basketball players of all time. Format: 1. Name 2. Name 3. Name',
        explanation: 'practiceExercises.fundamentals.chapter2Basketball.variations.top3List.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter2Basketball.variations.specificFormat.name',
        prompt: 'Who is the best basketball player of all time? Give only the name and one reason.',
        explanation: 'practiceExercises.fundamentals.chapter2Basketball.variations.specificFormat.explanation'
      }
    ],
    ui: { archetype: 'basic' }
  },
  {
    id: 'chapter2-long-story',
    title: 'practiceExercises.fundamentals.chapter2LongStory.title',
    description: 'practiceExercises.fundamentals.chapter2LongStory.description',
    userPrompt: 'Write a story that is at least 800 words long about a robot learning to paint.',
    expectedOutput: 'practiceExercises.fundamentals.chapter2LongStory.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter2LongStory.hints.0',
      'practiceExercises.fundamentals.chapter2LongStory.hints.1',
      'practiceExercises.fundamentals.chapter2LongStory.hints.2',
      'practiceExercises.fundamentals.chapter2LongStory.hints.3'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter2LongStory.variations.noLength.name',
        prompt: 'Write a story about a robot learning to paint.',
        explanation: 'practiceExercises.fundamentals.chapter2LongStory.variations.noLength.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter2LongStory.variations.exactWordCount.name',
        prompt: 'Write exactly a 800-word story about a robot learning to paint. Include dialogue and detailed descriptions.',
        explanation: 'practiceExercises.fundamentals.chapter2LongStory.variations.exactWordCount.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter2LongStory.variations.longerStory.name',
        prompt: 'Write a detailed story of at least 1000 words about a robot learning to paint, including character development and multiple scenes.',
        explanation: 'practiceExercises.fundamentals.chapter2LongStory.variations.longerStory.explanation'
      }
    ],
    ui: { archetype: 'basic' }
  },
  {
    id: 'chapter3-math-logic',
    title: 'practiceExercises.fundamentals.chapter3MathLogic.title',
    description: 'practiceExercises.fundamentals.chapter3MathLogic.description',
    systemPrompt: 'You are a strict math teacher. Carefully check each step of mathematical calculations for errors.',
    userPrompt: 'Is this equation solved correctly?\n\n2x - 3 = 9\n2x = 6\nx = 3',
    expectedOutput: 'practiceExercises.fundamentals.chapter3MathLogic.expectedOutput',
    hints: [
      'practiceExercises.fundamentals.chapter3MathLogic.hints.0',
      'practiceExercises.fundamentals.chapter3MathLogic.hints.1',
      'practiceExercises.fundamentals.chapter3MathLogic.hints.2'
    ],
    variations: [
      {
        name: 'practiceExercises.fundamentals.chapter3MathLogic.variations.noRole.name',
        prompt: 'Is this equation solved correctly?\n\n2x - 3 = 9\n2x = 6\nx = 3',
        systemPrompt: '',
        explanation: 'practiceExercises.fundamentals.chapter3MathLogic.variations.noRole.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter3MathLogic.variations.logicExpert.name',
        prompt: 'Is this equation solved correctly?\n\n2x - 3 = 9\n2x = 6\nx = 3',
        systemPrompt: 'You are a logic and mathematics expert. Analyze each step carefully and identify any errors in mathematical reasoning.',
        explanation: 'practiceExercises.fundamentals.chapter3MathLogic.variations.logicExpert.explanation'
      },
      {
        name: 'practiceExercises.fundamentals.chapter3MathLogic.variations.studentRole.name',
        prompt: 'Is this equation solved correctly?\n\n2x - 3 = 9\n2x = 6\nx = 3',
        systemPrompt: 'You are a student learning algebra. Approach this problem with curiosity and explain your thinking process step by step.',
        explanation: 'practiceExercises.fundamentals.chapter3MathLogic.variations.studentRole.explanation'
      }
    ],
    ui: { archetype: 'role', allowSystemPrompt: true }
  }
];
