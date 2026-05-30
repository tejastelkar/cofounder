import { useState } from 'react'
import { getTheme, toggleTheme } from '../utils/theme'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getTheme())

  function handle() {
    const next = toggleTheme()
    setTheme(next)
  }

  return (
    <button className="theme-toggle-float" onClick={handle}>
      {theme === 'dark' ? '☀ Light' : '☾ Dark'}
    </button>
  )
}
