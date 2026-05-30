export function getTheme(): 'light' | 'dark' {
  return (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
}

export function applyTheme(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme)
}

export function toggleTheme(): 'light' | 'dark' {
  const current = getTheme()
  const next = current === 'dark' ? 'light' : 'dark'
  applyTheme(next)
  return next
}
