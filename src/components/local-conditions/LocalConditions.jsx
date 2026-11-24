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
  return <aside aria-label="Abuja local time and weather" className="absolute right-4 top-3 z-10 rounded-full border border-white/20 bg-black/25 px-3 py-2 text-white shadow-sm backdrop-blur-md sm:right-8 sm:top-4 sm:px-4">
    <div className="flex items-center gap-2 sm:gap-3"><span className="font-[Playfair_Display] text-base tabular-nums sm:text-lg">{time}</span><span aria-hidden="true" className="h-4 w-px bg-white/30"/><span className="text-[10px] sm:text-xs">{weather ? `${Math.round(weather.temperature_2m)}°C · ${weatherName(weather.weather_code)}` : weatherError ? 'Weather unavailable' : 'Weather loading'}</span></div>
    {weather?.apparent_temperature != null && <p className="mt-1 text-right text-[9px] text-white/60">Feels {Math.round(weather.apparent_temperature)}°C · <a href="https://open-meteo.com/en/license" target="_blank" rel="noreferrer" className="underline underline-offset-2">Open-Meteo</a></p>}
  </aside>
}
