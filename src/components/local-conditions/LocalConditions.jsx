import { useEffect, useState } from 'react'

// Compact Abuja time and weather for the corner of the hero.
export default function LocalConditions() {
  const [now, setNow] = useState(() => new Date())
  const [temperature, setTemperature] = useState(null)

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 30 * 1000)
    const controller = new AbortController()
    const apiKey = import.meta.env.VITE_OPEN_METEO_API_KEY
    const apiHost = apiKey ? 'https://customer-api.open-meteo.com' : 'https://api.open-meteo.com'
    const loadWeather = () => {
      // The free Open-Meteo API is non-commercial only, so production needs the paid key.
      if (import.meta.env.PROD && !apiKey) return
      const key = apiKey ? `&apikey=${encodeURIComponent(apiKey)}` : ''
      fetch(`${apiHost}/v1/forecast?latitude=9.0203&longitude=7.4780&current=temperature_2m&timezone=Africa%2FLagos${key}`, { signal: controller.signal })
        .then((response) => { if (!response.ok) throw new Error('Weather request failed'); return response.json() })
        .then((data) => setTemperature(Math.round(data.current.temperature_2m)))
        .catch(() => {})
    }
    loadWeather()
    const refresh = window.setInterval(loadWeather, 10 * 60 * 1000)
    return () => { window.clearInterval(clock); window.clearInterval(refresh); controller.abort() }
  }, [])

  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: 'numeric', minute: '2-digit', hour12: true }).format(now)
  return <span aria-label="Abuja local time and weather" className="tabular-nums">Abuja &middot; {time.toUpperCase()}{temperature !== null && <><span> &middot; {temperature}&deg;C</span><span> &middot; </span><a href="https://open-meteo.com/en/license" target="_blank" rel="noreferrer" className="underline underline-offset-2">Weather by Open-Meteo</a></>}</span>
}
