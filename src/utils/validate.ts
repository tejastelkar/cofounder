export function isValidEmail(val: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
}

export function getPasswordStrength(val: string): 0 | 1 | 2 | 3 {
  if (val.length < 6) return 0
  let score = 0
  if (val.length >= 8) score++
  if (/[A-Z]/.test(val)) score++
  if (/[0-9]/.test(val)) score++
  return score as 0 | 1 | 2 | 3
}

export function validateSignup(name: string, email: string, password: string, confirm: string) {
  const errors: Record<string, string> = {}
  if (!name.trim()) errors.name = 'Name is required'
  else if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters'
  if (!email.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!password) errors.password = 'Password is required'
  else if (password.length < 8) errors.password = 'Password must be at least 8 characters'
  else if (!/[A-Z]/.test(password)) errors.password = 'Include at least one uppercase letter'
  else if (!/[0-9]/.test(password)) errors.password = 'Include at least one number'
  if (!confirm) errors.confirm = 'Please confirm your password'
  else if (confirm !== password) errors.confirm = 'Passwords do not match'
  return errors
}

export function validateLogin(email: string, password: string) {
  const errors: Record<string, string> = {}
  if (!email.trim()) errors.email = 'Email is required'
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address'
  if (!password) errors.password = 'Password is required'
  return errors
}
