export type Driver = {
  id: number
  number: number
  name: string
  team: string
  color: string
  pace: number
  gap: number
  progress: number
  lap: number
  position: number
  pitStops: number
}

const raw: Omit<Driver, 'progress' | 'lap' | 'position' | 'pitStops'>[] = [
  { id: 1, number: 1, name: 'Max Verstappen', team: 'Red Bull', color: '#3671C6', pace: 0.986, gap: 0 },
  { id: 2, number: 22, name: 'Yuki Tsunoda', team: 'Red Bull', color: '#3671C6', pace: 0.965, gap: 0 },
  { id: 3, number: 4, name: 'Lando Norris', team: 'McLaren', color: '#FF8000', pace: 0.981, gap: 0 },
  { id: 4, number: 81, name: 'Oscar Piastri', team: 'McLaren', color: '#FF8000', pace: 0.978, gap: 0 },
  { id: 5, number: 16, name: 'Charles Leclerc', team: 'Ferrari', color: '#E8002D', pace: 0.979, gap: 0 },
  { id: 6, number: 44, name: 'Lewis Hamilton', team: 'Ferrari', color: '#E8002D', pace: 0.974, gap: 0 },
  { id: 7, number: 63, name: 'George Russell', team: 'Mercedes', color: '#27F4D2', pace: 0.973, gap: 0 },
  { id: 8, number: 12, name: 'Kimi Antonelli', team: 'Mercedes', color: '#27F4D2', pace: 0.956, gap: 0 },
  { id: 9, number: 14, name: 'Fernando Alonso', team: 'Aston Martin', color: '#229971', pace: 0.954, gap: 0 },
  { id: 10, number: 18, name: 'Lance Stroll', team: 'Aston Martin', color: '#229971', pace: 0.941, gap: 0 },
  { id: 11, number: 10, name: 'Pierre Gasly', team: 'Alpine', color: '#FF87BC', pace: 0.948, gap: 0 },
  { id: 12, number: 7, name: 'Jack Doohan', team: 'Alpine', color: '#FF87BC', pace: 0.932, gap: 0 },
  { id: 13, number: 22, name: 'Alexander Albon', team: 'Williams', color: '#64C4FF', pace: 0.951, gap: 0 },
  { id: 14, number: 55, name: 'Carlos Sainz', team: 'Williams', color: '#64C4FF', pace: 0.958, gap: 0 },
  { id: 15, number: 30, name: 'Liam Lawson', team: 'Racing Bulls', color: '#6692FF', pace: 0.944, gap: 0 },
  { id: 16, number: 6, name: 'Isack Hadjar', team: 'Racing Bulls', color: '#6692FF', pace: 0.939, gap: 0 },
  { id: 17, number: 31, name: 'Esteban Ocon', team: 'Haas', color: '#B6BABD', pace: 0.943, gap: 0 },
  { id: 18, number: 87, name: 'Oliver Bearman', team: 'Haas', color: '#B6BABD', pace: 0.936, gap: 0 },
  { id: 19, number: 27, name: 'Nico Hülkenberg', team: 'Kick Sauber', color: '#52E252', pace: 0.942, gap: 0 },
  { id: 20, number: 5, name: 'Gabriel Bortoleto', team: 'Kick Sauber', color: '#52E252', pace: 0.934, gap: 0 },
  { id: 21, number: 11, name: 'Sergio Pérez', team: 'Cadillac', color: '#D8D8D8', pace: 0.938, gap: 0 },
  { id: 22, number: 77, name: 'Valtteri Bottas', team: 'Cadillac', color: '#D8D8D8', pace: 0.937, gap: 0 },
]

export const createGrid = (): Driver[] => raw.map((driver, index) => ({
  ...driver, progress: 0, lap: 1, position: index + 1, pitStops: 0,
}))
