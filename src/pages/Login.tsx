import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateLogin } from '../utils/validate'
import { loginUser } from '../utils/users'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  function touch(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  function validate() {
    const errs = validateLogin(email, password)
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function triggerShake() {
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ email: true, password: true })
    const errs = validateLogin(email, password)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      triggerShake()
      return
    }
    setLoading(true)
    setFormError('')
    await new Promise(r => setTimeout(r, 800))
    const err = loginUser(email, password)
    if (err) {
      setLoading(false)
      setFormError(err)
      triggerShake()
      return
    }
    localStorage.setItem('token', 'fake-token-123')
    navigate('/dashboard')
  }

  function fieldValid(field: string) {
    return touched[field] && !errors[field]
  }

  function fieldError(field: string) {
    return touched[field] && errors[field]
  }

  return (
    <div className="login-wrap">
      <div ref={boxRef} className={`login-box ${shaking ? 'shake' : ''}`}>
        <h1>Welcome back</h1>
        <p className="tagline">Sign in to your account to continue.</p>

        {formError && <div className="form-error">{formError}</div>}

        <form
          onSubmit={handleSubmit}
          onBlur={() => validate()}
          noValidate
        >
          <div className="field">
            <div className="field-header">
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-wrap">
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => { touch('email'); validate() }}
                placeholder="you@example.com"
                className={fieldError('email') ? 'has-error' : fieldValid('email') ? 'is-valid' : ''}
              />
            </div>
            {fieldError('email') && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field">
            <div className="field-header">
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-wrap">
              <input
                id="password"
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onBlur={() => { touch('password'); validate() }}
                placeholder="••••••••"
                className={fieldError('password') ? 'has-error' : fieldValid('password') ? 'is-valid' : ''}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowPw(p => !p)}
                tabIndex={-1}
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldError('password') && <p className="field-error">{errors.password}</p>}
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading && <span className="btn-spinner" />}
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
