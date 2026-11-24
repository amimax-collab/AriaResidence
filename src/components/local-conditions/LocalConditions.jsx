import { useEffect, useState } from 'react'

const weatherName = (code) => {
  if (code === 0) return 'Clear sky'
  if ([1, 2].includes(code)) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if ([45, 48].includes(code)) return 'Foggy'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Light drizzle'
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain showers'
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow'
  if ([95, 96, 99].includes(code)) return 'Thunderstorms'
  return 'Current conditions'
}

export default function LocalConditions() {
  const [now, setNow] = useState(() => new Date())
  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(false)

  useEffect(() => {
    const clock = window.setInterval(() => setNow(new Date()), 1000)
    const controller = new AbortController()
    const apiKey = import.meta.env.VITE_OPEN_METEO_API_KEY
    const apiHost = apiKey ? 'https://customer-api.open-meteo.com' : 'https://api.open-meteo.com'
    const loadWeather = () => {
      if (import.meta.env.PROD && !apiKey) { setWeatherError(true); return }
      const key = apiKey ? `&apikey=${encodeURIComponent(apiKey)}` : ''
      return fetch(`${apiHost}/v1/forecast?latitude=9.0203&longitude=7.4780&current=temperature_2m,apparent_temperature,weather_code&timezone=Africa%2FLagos${key}`, { signal: controller.signal })
        .then((response) => { if (!response.ok) throw new Error('Weather request failed'); return response.json() })
        .then((data) => { setWeather(data.current); setWeatherError(false) })
        .catch(() => { if (!controller.signal.aborted) setWeatherError(true) })
    }
    loadWeather()
    const refresh = window.setInterval(loadWeather, 10 * 60 * 1000)
    return () => { window.clearInterval(clock); window.clearInterval(refresh); controller.abort() }
  }, [])

  const time = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hour12: true }).format(now)
  return <aside aria-label="Abuja local time and weather" className="absolute right-5 top-5 z-10 w-48 border border-white/25 bg-black/25 p-4 text-white shadow-lg backdrop-blur-md sm:right-10 sm:top-8 sm:w-56">
    <p className="text-[9px] uppercase tracking-[.22em] text-white/70">Abuja / local time</p>
    <p className="mt-1 font-[Playfair_Display] text-3xl tabular-nums">{time}</p>
    <p className="mt-3 border-t border-white/20 pt-3 text-sm">{weather ? `${Math.round(weather.temperature_2m)}${String.fromCharCode(176)}C / ${weatherName(weather.weather_code)}` : weatherError ? 'Weather unavailable' : 'Loading weather...'}</p>
    {weather?.apparent_temperature != null && <p className="mt-1 text-[10px] text-white/65">Feels like {Math.round(weather.apparent_temperature)}{String.fromCharCode(176)}C / <a href="https://open-meteo.com/en/license" target="_blank" rel="noreferrer" className="underline underline-offset-2">Open-Meteo</a></p>}
  </aside>
}
