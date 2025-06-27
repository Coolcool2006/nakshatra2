import { nakshatras } from '@/data/nakshatras';
import type { NakshatraTime } from '@/lib/types';

// Each Nakshatra spans 13°20'. The moon travels this in about 23.6 hours.
// For simulation, we'll use a fixed duration.
const NAKSHATRA_DURATION_HOURS = 23.6;
const NAKSHATRA_DURATION_MS = NAKSHATRA_DURATION_HOURS * 60 * 60 * 1000;
const FULL_CYCLE_MS = 27 * NAKSHATRA_DURATION_MS;

// A fixed point in time to anchor our simulation
const REFERENCE_TIME = new Date('2024-01-01T00:00:00Z').getTime();

export function getCurrentNakshatra(now: Date): NakshatraTime {
  const timeSinceReference = now.getTime() - REFERENCE_TIME;
  const elapsedCycles = Math.floor(timeSinceReference / FULL_CYCLE_MS);
  
  const currentCycleStartTime = REFERENCE_TIME + elapsedCycles * FULL_CYCLE_MS;
  
  let nakshatraIndex = 0;
  for (let i = 0; i < 27; i++) {
    const nakshatraStartTime = currentCycleStartTime + i * NAKSHATRA_DURATION_MS;
    if (now.getTime() >= nakshatraStartTime && now.getTime() < nakshatraStartTime + NAKSHATRA_DURATION_MS) {
      nakshatraIndex = i;
      break;
    }
  }

  // Handle edge case where time might be outside the loop (unlikely but safe)
  if (nakshatraIndex === -1) {
    const currentCycleProgress = timeSinceReference % FULL_CYCLE_MS;
    nakshatraIndex = Math.floor(currentCycleProgress / NAKSHATRA_DURATION_MS);
  }

  const currentNakshatraData = nakshatras[nakshatraIndex];
  const startTime = new Date(currentCycleStartTime + nakshatraIndex * NAKSHATRA_DURATION_MS);
  const endTime = new Date(startTime.getTime() + NAKSHATRA_DURATION_MS);

  return {
    ...currentNakshatraData,
    startTime,
    endTime,
  };
}

export function getUpcomingNakshatras(now: Date, count: number = 27): NakshatraTime[] {
  const upcoming: NakshatraTime[] = [];
  let lastEndTime = getCurrentNakshatra(now).endTime;
  let lastNakshatraId = getCurrentNakshatra(now).id;

  for (let i = 0; i < count; i++) {
    const nextNakshatraIndex = (lastNakshatraId + i) % 27;
    const nextNakshatraData = nakshatras[nextNakshatraIndex];

    const startTime = new Date(lastEndTime.getTime() + i * NAKSHATRA_DURATION_MS);
    const endTime = new Date(startTime.getTime() + NAKSHATRA_DURATION_MS);

    upcoming.push({
      ...nextNakshatraData,
      startTime,
      endTime,
    });
  }

  return upcoming;
}

export function formatDuration(milliseconds: number) {
  if (milliseconds < 0) milliseconds = 0;
  
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }
  return `${hours}h ${minutes}m ${seconds}s`;
}
