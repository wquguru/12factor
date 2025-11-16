import { Course } from './types';
import { fundamentalsCourse } from './fundamentals';
import { intermediateCourse } from './intermediate';
import { advancedCourse } from './advanced';
import { bestPracticeCourse } from './best-practice';

export const courses: Record<string, Course> = {
  fundamentals: fundamentalsCourse,
  intermediate: intermediateCourse,
  advanced: advancedCourse,
  'best-practice': bestPracticeCourse
};

export const getCourse = (id: string): Course | undefined => {
  return courses[id];
};

export const getAllCourses = (): Course[] => {
  return Object.values(courses);
};

export const getCourseIds = (): string[] => {
  return Object.keys(courses);
};

export * from './types';
export * from './fundamentals';
export * from './intermediate';
export * from './advanced';
export * from './best-practice';
