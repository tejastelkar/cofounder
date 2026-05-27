import { useState, useEffect } from 'react'
import { steps } from '../utils/onboardingSteps'
import Navbar from '../components/Navbar'

const STORAGE_KEY = 'onboarding_completed'

export default function Onboarding() {
  const [completed, setCompleted] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed))
  }, [completed])

  function toggleStep(id: number) {
    setCompleted(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const pct = Math.round((completed.length / steps.length) * 100)

  return (
    <div>
      <Navbar />
      <div className="page">
        <h1>Onboarding</h1>
        <p className="sub">Complete the steps below to get fully set up.</p>

        <div className="progress-bar-wrap">
          <div className="progress-label">
            <span>{completed.length} of {steps.length} completed</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {steps.map(step => {
          const done = completed.includes(step.id)
          return (
            <div key={step.id} className={`step-card ${done ? 'done' : ''}`}>
              <div className={`step-num ${done ? 'done' : ''}`}>
                {done ? '✓' : step.id}
              </div>
              <div className="step-info">
                <h3 className={done ? 'done' : ''}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <button
                className={`mark-btn ${done ? 'done' : ''}`}
                onClick={() => toggleStep(step.id)}
              >
                {done ? 'Undo' : 'Mark Complete'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
