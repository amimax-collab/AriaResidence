export const CHECK_IN_TIME = '2:00 PM'
export const CHECK_OUT_TIME = '12:00 PM'

const pad = (value) => String(value).padStart(2, '0')

export const toISO = (year, monthIndex, day) => `${year}-${pad(monthIndex + 1)}-${pad(day)}`

export function nextDay(value) {
  const [year, month, day] = value.split('-').map(Number)
  const next = new Date(year, month - 1, day + 1)
  return toISO(next.getFullYear(), next.getMonth(), next.getDate())
}

const ordinal = (day) => `${day}${day % 100 >= 11 && day % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th')}`

// '2026-11-26' -> 'Thursday 26th November'   (with { year: true } -> 'Thursday 26th November 2026')
export function formatDay(value, { year = false } = {}) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00Z`)
  const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: 'UTC' }).format(date)
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }).format(date)
  return `${weekday} ${ordinal(date.getUTCDate())} ${month}${year ? ` ${date.getUTCFullYear()}` : ''}`
}