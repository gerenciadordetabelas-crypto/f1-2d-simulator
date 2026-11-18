import React, { Component, type ErrorInfo, type ReactNode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

class AppErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null as string | null }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message || 'Erro inesperado ao iniciar o simulador.' }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('F1 2D Simulator render error:', error, info.componentStack)
  }
  render() {
    if (this.state.error) {
      return <main style={{ minHeight: '100vh', background: '#090b0e', color: '#f4f5f6', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#f5d400' }}>F1 2D Simulator</h1>
        <h2>Não foi possível iniciar a tela</h2>
        <p>Erro ao carregar o simulador:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#171c22', padding: '16px', borderRadius: '6px' }}>{this.state.error}</pre>
      </main>
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><AppErrorBoundary><App /></AppErrorBoundary></React.StrictMode>,
)
