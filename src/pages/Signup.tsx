import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateSignup, getPasswordStrength } from '../utils/validate'
import { registerUser } from '../utils/users'
import ThemeToggle from '../components/ThemeToggle'

const strengthLabels = ['', 'Weak', 'Medium', 'Strong']
const strengthClasses = ['', 'weak', 'medium', 'strong']

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)
  const [shaking, setShaking] = useState(false)
  const navigate = useNavigate()

  const strength = getPasswordStrength(password)

  function touch(field: string) {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  function validate() {
    const errs = validateSignup(name, email, password, confirm)
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function triggerShake() {
    setShaking(true)
    setTimeout(() => setShaking(false), 500)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true })
    const errs = validateSignup(name, email, password, confirm)
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      triggerShake()
      return
    }
    setLoading(true)
    setFormError('')
    await new Promise(r => setTimeout(r, 900))
    const err = registerUser(name, email, password)
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
      <ThemeToggle />
      <div className={`login-box ${shaking ? 'shake' : ''}`}>
        <h1>Create account</h1>
        <p className="tagline">Get started — it only takes a minute.</p>

        {formError && <div className="form-error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <div className="field-header">
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-wrap">
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onBlur={() => { touch('name'); validate() }}
                placeholder="Your full name"
                className={fieldError('name') ? 'has-error' : fieldValid('name') ? 'is-valid' : ''}
              />
            </div>
            {fieldError('name') && <p className="field-error">{errors.name}</p>}
          </div>

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
                placeholder="Min 8 chars, 1 uppercase, 1 number"
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
            {password && (
              <>
                <div className="strength-bar">
                  <div
                    className={`strength-fill ${strengthClasses[strength]}`}
                    style={{ width: `${(strength / 3) * 100}%` }}
                  />
                </div>
                <p className={`strength-label ${strengthClasses[strength]}`}>
                  {strengthLabels[strength]}
                </p>
              </>
            )}
            {fieldError('password') && <p className="field-error">{errors.password}</p>}
          </div>

          <div className="field">
            <div className="field-header">
              <label htmlFor="confirm">Confirm password</label>
            </div>
            <div className="input-wrap">
              <input
                id="confirm"
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                onBlur={() => { touch('confirm'); validate() }}
                placeholder="••••••••"
                className={fieldError('confirm') ? 'has-error' : fieldValid('confirm') ? 'is-valid' : ''}
              />
              <button
                type="button"
                className="toggle-pw"
                onClick={() => setShowConfirm(p => !p)}
                tabIndex={-1}
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>
            {fieldError('confirm') && <p className="field-error">{errors.confirm}</p>}
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading && <span className="btn-spinner" />}
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
