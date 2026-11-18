export type Circuit = { name: string; country: string; laps: number; length: string; points: [number, number][] }

export const interlagos: Circuit = {
  name: 'Autódromo José Carlos Pace',
  country: 'São Paulo · Brasil',
  laps: 12,
  length: '4,309 km',
  points: [
    [0.18,0.72],[0.24,0.66],[0.31,0.62],[0.39,0.60],[0.48,0.60],
    [0.56,0.63],[0.64,0.68],[0.72,0.68],[0.78,0.62],[0.82,0.53],
    [0.80,0.43],[0.74,0.37],[0.67,0.35],[0.60,0.39],[0.53,0.44],
    [0.45,0.44],[0.39,0.39],[0.35,0.31],[0.29,0.27],[0.22,0.30],
    [0.17,0.38],[0.16,0.48],[0.18,0.56],[0.18,0.72],
  ],
}
