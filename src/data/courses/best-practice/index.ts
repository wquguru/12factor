import { Course } from '../types';
import { bestPracticeContent } from './content';
import { bestPracticePractice } from './practice';
import { bestPracticePlayground } from './playground';

export const bestPracticeCourse: Course = {
  content: bestPracticeContent,
  practice: bestPracticePractice,
  playground: bestPracticePlayground,
  prerequisites: ['fundamentals', 'intermediate', 'advanced']
};

export * from './content';
export * from './practice';
export * from './playground';
