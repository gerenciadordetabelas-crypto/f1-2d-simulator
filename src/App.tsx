import { useEffect, useMemo, useState } from 'react'
import { Flag, Gauge, Pause, Play, RotateCcw, Timer, Trophy } from 'lucide-react'
import TrackCanvas from './components/TrackCanvas'
import { createGrid, type Driver } from './data/grid'
import { interlagos } from './data/circuits'
import { advanceRace } from './engine/simulation'

const STORAGE_KEY = 'f1-2d-simulator-race-v1'
const speeds = [1, 2, 4, 8]

type Saved = { drivers: Driver[]; running: boolean; speed: number; elapsed: number }

function loadRace(): Saved | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value ? JSON.parse(value) as Saved : null
  } catch { return null }
}

export default function App() {
  const saved = useMemo(loadRace, [])
  const [drivers, setDrivers] = useState<Driver[]>(saved?.drivers ?? createGrid())
  const [running, setRunning] = useState(saved?.running ?? false)
  const [speed, setSpeed] = useState(saved?.speed ?? 1)
  const [elapsed, setElapsed] = useState(saved?.elapsed ?? 0)
  const [selected, setSelected] = useState<number | null>(null)
  const leader = drivers[0]
  const finished = leader.progress >= interlagos.laps

  useEffect(() => {
    if (!running || finished) return
    const timer = window.setInterval(() => {
      setDrivers((current) => advanceRace(current, interlagos.laps))
      setElapsed((current) => current + 1)
    }, 1000 / speed)
    return () => window.clearInterval(timer)
  }, [running, speed, finished])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ drivers, running, speed, elapsed }))
  }, [drivers, running, speed, elapsed])

  const reset = () => {
    setDrivers(createGrid())
    setRunning(false)
    setSpeed(1)
    setElapsed(0)
    setSelected(null)
  }

  const selectedDriver = drivers.find((driver) => driver.id === selected)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return mins + ':' + secs
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><div className="brand-mark">F1</div><div><strong>F1 2D <span>SIMULATOR</span></strong><small>RACE CONTROL · BETA 0.1</small></div></div>
        <div className="live-status"><i className={running ? 'pulse on' : 'pulse'} />{finished ? 'CORRIDA FINALIZADA' : running ? 'AO VIVO' : 'SIMULAÇÃO PAUSADA'}</div>
      </header>

      <section className="race-heading">
        <div><div className="eyebrow">TEMPORADA DEMONSTRATIVA · GRANDE PRÊMIO</div><h1>São Paulo <span>Grand Prix</span></h1><p><Flag size={14} /> {interlagos.country} <b>·</b> {interlagos.name}</p></div>
        <div className="race-stats">
          <div><small>VOLTA</small><strong>{Math.min(interlagos.laps, leader.lap)} <em>/ {interlagos.laps}</em></strong></div>
          <div><small>TEMPO DE SESSÃO</small><strong>{formatTime(elapsed)}</strong></div>
          <div><small>EXTENSÃO</small><strong>{interlagos.length}</strong></div>
        </div>
      </section>

      <section className="control-bar">
        <div className="control-left"><span className="control-label">CONTROLE DE CORRIDA</span>
          <button className="primary-control" onClick={() => setRunning(!running)} disabled={finished}>{running ? <Pause size={16} /> : <Play size={16} />}{running ? 'PAUSAR' : 'INICIAR'}</button>
          <button className="icon-control" onClick={reset} title="Reiniciar corrida"><RotateCcw size={16} /></button>
        </div>
        <div className="speed-control"><Gauge size={16} /><span>VELOCIDADE</span>{speeds.map((value) => <button key={value} className={speed === value ? 'speed active' : 'speed'} onClick={() => setSpeed(value)}>{value}x</button>)}</div>
      </section>

      <div className="dashboard">
        <section className="track-panel panel">
          <div className="panel-heading"><div><span className="section-kicker">RACE TRACK</span><h2>Mapa da pista</h2></div><span className="track-tag">INTERLAGOS · BR</span></div>
          <TrackCanvas drivers={drivers} circuit={interlagos} selected={selected} onSelect={setSelected} />
          <div className="track-footer"><span><i className="legend-dot" /> 22 CARROS EM PISTA</span><span>SELECIONE UM CARRO PARA VER O PILOTO</span></div>
          {selectedDriver && <div className="driver-focus"><span className="team-stripe" style={{ background: selectedDriver.color }} /><div><small>PILOTO SELECIONADO</small><strong>#{selectedDriver.number} {selectedDriver.name}</strong><span>{selectedDriver.team}</span></div><b>P{selectedDriver.position}</b></div>}
        </section>

        <section className="timing-panel panel">
          <div className="panel-heading"><div><span className="section-kicker">LIVE TIMING</span><h2>Classificação</h2></div><span className="live-pill"><i /> LIVE</span></div>
          <div className="table-head"><span>POS</span><span>PILOTO / EQUIPE</span><span>VOLTA</span><span>INTERVALO</span></div>
          <div className="timing-list">{drivers.map((driver) => (
            <button className={selected === driver.id ? 'timing-row selected' : 'timing-row'} key={driver.id} onClick={() => setSelected(driver.id)}>
              <strong className="position">{String(driver.position).padStart(2, '0')}</strong>
              <span className="driver-cell"><i style={{ background: driver.color }} /><span><b>{driver.name}</b><small>{driver.team}</small></span></span>
              <span className="lap-cell">{Math.min(interlagos.laps, driver.lap)}</span>
              <span className="gap-cell">{driver.position === 1 ? 'LÍDER' : '+' + driver.gap.toFixed(3) + 's'}</span>
            </button>
          ))}</div>
          <div className="timing-footer"><Trophy size={14} /> ORDEM ATUALIZADA AUTOMATICAMENTE</div>
        </section>
      </div>

      <footer className="app-footer"><span><b>F1 2D SIMULATOR</b> · PROJETO EM DESENVOLVIMENTO</span><span><Timer size={13} /> SIMULAÇÃO LOCAL · PROGRESSO SALVO NO NAVEGADOR</span></footer>
    </main>
  )
}
