type User = { name: string; email: string; password: string }

function load(): User[] {
  try {
    return JSON.parse(localStorage.getItem('users') || '[]')
  } catch {
    return []
  }
}

function save(users: User[]) {
  localStorage.setItem('users', JSON.stringify(users))
}

export function registerUser(name: string, email: string, password: string): string | null {
  const users = load()
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return 'An account with this email already exists'
  }
  save([...users, { name, email: email.toLowerCase(), password }])
  return null
}

export function loginUser(email: string, password: string): string | null {
  const users = load()
  const match = users.find(u => u.email === email.toLowerCase())
  if (!match) return 'No account found with this email'
  if (match.password !== password) return 'Incorrect password'
  return null
}
