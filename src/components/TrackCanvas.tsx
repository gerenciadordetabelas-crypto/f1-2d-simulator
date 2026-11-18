import { useEffect, useRef } from 'react'
import type { Driver } from '../data/grid'
import type { Circuit } from '../data/circuits'

type Props = { drivers: Driver[]; circuit: Circuit; selected: number | null; onSelect: (id: number) => void }

export default function TrackCanvas({ drivers, circuit, selected, onSelect }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#101419'
    ctx.fillRect(0, 0, width, height)

    const coords = circuit.points.map(([x, y]) => [x * width, y * height] as const)
    const drawTrack = (lineWidth: number, color: string) => {
      ctx.beginPath()
      coords.forEach(([x, y], i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y))
      ctx.lineJoin = 'round'
      ctx.lineCap = 'round'
      ctx.strokeStyle = color
      ctx.lineWidth = lineWidth
      ctx.stroke()
    }
    drawTrack(42, '#303840')
    drawTrack(3, '#e6e9eb')
    drawTrack(1, '#9ba4ab')

    drivers.forEach((driver) => {
      const t = ((driver.progress * 0.085 + (driver.id * 0.037)) % 1)
      const segment = t * (coords.length - 1)
      const index = Math.floor(segment)
      const mix = segment - index
      const a = coords[index]
      const b = coords[Math.min(index + 1, coords.length - 1)]
      const x = a[0] + (b[0] - a[0]) * mix
      const y = a[1] + (b[1] - a[1]) * mix
      ctx.beginPath()
      ctx.arc(x, y, selected === driver.id ? 13 : 10, 0, Math.PI * 2)
      ctx.fillStyle = driver.color
      ctx.fill()
      ctx.lineWidth = selected === driver.id ? 3 : 1.5
      ctx.strokeStyle = selected === driver.id ? '#fff' : '#111'
      ctx.stroke()
      ctx.fillStyle = '#071014'
      ctx.font = 'bold 9px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(String(driver.number), x, y)
    })
  }, [drivers, circuit, selected])

  return <canvas ref={canvasRef} width={900} height={560} className="track-canvas" onClick={(event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width * 900
    const y = (event.clientY - rect.top) / rect.height * 560
    let closestId: number | null = null
    let distance = Infinity
    drivers.forEach((driver) => {
      const t = ((driver.progress * 0.085 + (driver.id * 0.037)) % 1)
      const segment = t * (circuit.points.length - 1)
      const index = Math.floor(segment)
      const mix = segment - index
      const a = circuit.points[index]
      const b = circuit.points[Math.min(index + 1, circuit.points.length - 1)]
      const dx = (a[0] + (b[0] - a[0]) * mix) * 900 - x
      const dy = (a[1] + (b[1] - a[1]) * mix) * 560 - y
      const d = dx * dx + dy * dy
      if (d < distance) { distance = d; closestId = driver.id }
    })
    if (closestId !== null && distance < 1800) onSelect(closestId)
  }} />
}
