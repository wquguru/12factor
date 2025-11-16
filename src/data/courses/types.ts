export interface CourseContent {
  id: string;
  title: string;
  summary: string;
  icon: 'book' | 'code' | 'beaker';
  sections: CourseSection[];
}

export interface CourseSection {
  id: string;
  title: string;
  theory: string;
  examples?: string | string[];
  exercises?: ExerciseData[];
  // Chapter specific properties - keeping flexible for different course types
  [key: string]: unknown;
}

export interface ExerciseData {
  id: string;
  instructions: string;
  template?: string;
  expectedPattern?: string;
  hints: string | string[];
}

export type UIArchetype =
  | 'basic'
  | 'role'
  | 'template'
  | 'structured'
  | 'few-shot'
  | 'chaining';

export interface UIConfig {
  archetype?: UIArchetype;
  allowSystemPrompt?: boolean;
  allowTemplate?: boolean;
  allowPrefill?: boolean;
  allowChaining?: boolean;
  expectedFormat?: 'xml' | 'json' | null;
  showExamplesPane?: boolean;
}

export interface Variation {
  name: string;
  prompt: string;
  systemPrompt?: string;
  explanation: string;
}

export interface PlaygroundExample {
  name: string;
  prompt: string;
  systemPrompt?: string;
  description: string;
  variations: Variation[];
  ui?: UIConfig;
}

export interface PlaygroundScenario {
  id: string;
  title: string;
  examples: PlaygroundExample[];
  hints: string[];
  ui?: UIConfig;
}

export interface PracticeExample {
  id: string;
  title: string;
  description: string;
  systemPrompt?: string;
  userPrompt: string;
  expectedOutput: string;
  hints: string[];
  variations: Variation[];
  ui?: UIConfig;
}

export interface Course {
  content: CourseContent;
  practice: PracticeExample[];
  playground: PlaygroundScenario[];
  prerequisites?: string[];
}
