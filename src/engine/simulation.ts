import type { Driver } from '../data/grid'

export function advanceRace(drivers: Driver[], totalLaps: number): Driver[] {
  const updated = drivers.map((driver) => {
    const variation = (Math.random() - 0.48) * 0.0018
    const progress = Math.min(totalLaps, driver.progress + Math.max(0.004, driver.pace * 0.018 + variation))
    return { ...driver, progress, lap: Math.min(totalLaps, Math.floor(progress) + 1) }
  })
  return updated
    .sort((a, b) => b.progress - a.progress)
    .map((driver, index, all) => ({
      ...driver,
      position: index + 1,
      gap: index === 0 ? 0 : Math.max(0, (all[0].progress - driver.progress) * 78),
    }))
}
