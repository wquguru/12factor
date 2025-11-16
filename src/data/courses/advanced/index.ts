import { Course } from '../types';
import { advancedContent } from './content';
import { advancedPractice } from './practice';
import { advancedPlayground } from './playground';

export const advancedCourse: Course = {
  content: advancedContent,
  practice: advancedPractice,
  playground: advancedPlayground,
  prerequisites: ['fundamentals', 'intermediate']
};

export * from './content';
export * from './practice';
export * from './playground';
