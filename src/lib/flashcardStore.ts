'use client';

import { principles } from '@/data/principles';
import { UserProgress } from '@/types';

/**
 * localStorage is the source of truth for flashcard progress; React subscribes
 * to it through useSyncExternalStore rather than mirroring it into state inside
 * a mount effect. getSnapshot must be referentially stable between changes, so
 * the parsed value is cached against the raw string it came from.
 */
const PROGRESS_KEY = 'flashcard-progress';
const INDEX_KEY = 'flashcard-current-index';

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

function makeInitialProgress(): UserProgress[] {
  return principles.map((p) => ({
    principleId: p.id,
    status: 'not_started',
    lastReviewed: new Date(),
    correctAnswers: 0,
    totalAttempts: 0,
  }));
}

let progressRaw: string | null = null;
let progressValue: UserProgress[] = [];

export function getProgress(): UserProgress[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(PROGRESS_KEY);
  } catch {
    return progressValue;
  }
  if (raw === null) {
    const initial = makeInitialProgress();
    setProgress(initial);
    return progressValue;
  }
  if (raw !== progressRaw) {
    progressRaw = raw;
    try {
      progressValue = JSON.parse(raw) as UserProgress[];
    } catch {
      progressValue = makeInitialProgress();
    }
  }
  return progressValue;
}

export function setProgress(next: UserProgress[]) {
  progressValue = next;
  progressRaw = JSON.stringify(next);
  try {
    localStorage.setItem(PROGRESS_KEY, progressRaw);
  } catch {
    // Blocked storage: the value still lives in memory for this session.
  }
  emit();
}

let indexValue = 0;

export function getIndex(): number {
  try {
    const raw = localStorage.getItem(INDEX_KEY);
    const parsed = raw === null ? 0 : parseInt(raw, 10);
    indexValue = Number.isFinite(parsed) && parsed >= 0 && parsed < principles.length ? parsed : 0;
  } catch {
    // Keep the last known value.
  }
  return indexValue;
}

export function setIndex(next: number) {
  indexValue = next;
  try {
    localStorage.setItem(INDEX_KEY, String(next));
  } catch {
    // Blocked storage: navigation still works, it just will not persist.
  }
  emit();
}

export const serverProgress = (): UserProgress[] => [];
export const serverIndex = () => 0;
