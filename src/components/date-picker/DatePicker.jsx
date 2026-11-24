import { useState } from 'react'

const pad = (value) => String(value).padStart(2, '0')
const toISO = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`

export default function DatePicker({ checkIn, checkOut, setCheckIn, setCheckOut, today }) {
  const [month, setMonth] = useState(() => {
    const value = (checkIn || today).split('-').map(Number)
    return new Date(value[0], value[1] - 1, 1)
  })
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const days = new Date(year, monthIndex + 1, 0).getDate()
  const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)]

  function choose(date) {
    if (!checkIn || checkOut || date <= checkIn) {
      setCheckIn(date)
      setCheckOut('')
      return
    }
    setCheckOut(date)
  }

  const format = (value) => value ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) : 'Select date'

  return <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
    <div className="flex items-center justify-between">
      <div><p className="text-[9px] uppercase tracking-[.16em] text-[#77786f]">Choose your dates</p><p className="mt-2 text-sm">{format(checkIn)} <span className="mx-1 text-[#aaa]">to</span> {format(checkOut)}</p></div>
      <div className="flex gap-2"><button type="button" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">←</button><button type="button" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">→</button></div>
    </div>
    <p className="mt-6 text-center font-[Playfair_Display] text-lg">{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)}</p>
    <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day} className="py-2 text-[9px] uppercase tracking-wider text-[#85877d]">{day}</span>)}
      {cells.map((day, index) => {
        if (!day) return <span key={`blank-${index}`} />
        const date = toISO(year, monthIndex, day)
        const selected = date === checkIn || date === checkOut
        const inRange = checkIn && checkOut && date > checkIn && date < checkOut
        const past = date < today
        return <button key={date} type="button" disabled={past} onClick={() => choose(date)} aria-pressed={selected} className={`mx-auto grid h-10 w-10 place-items-center rounded-full text-sm transition ${selected ? 'bg-[#253c32] text-white' : inRange ? 'rounded-none bg-[#e7ece7] text-[#253c32]' : 'hover:bg-[#f0efe9]'} ${past ? 'cursor-not-allowed text-black/20' : ''}`}>{day}</button>
      })}
    </div>
    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-[10px] text-[#77786f]"><p>Check-in <strong className="ml-1 font-medium text-[#222622]">2:00 PM</strong></p><p className="text-right">Check-out <strong className="ml-1 font-medium text-[#222622]">12:00 PM</strong></p></div>
  </div>
}
