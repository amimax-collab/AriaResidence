import { useState } from 'react'
import { isAvailable, isRoomDateOccupied } from '../../data/rooms'

const pad = (value) => String(value).padStart(2, '0')
const toISO = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`
const nextDay = (value) => {
  const [year, month, day] = value.split('-').map(Number)
  const next = new Date(year, month - 1, day + 1)
  return toISO(next.getFullYear(), next.getMonth(), next.getDate())
}
const ordinal = (day) => `${day}${day % 100 >= 11 && day % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th')}`
const formatDate = (value) => {
  if (!value) return 'Choose a date'
  const date = new Date(`${value}T00:00:00Z`)
  const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: 'UTC' }).format(date)
  const month = new Intl.DateTimeFormat('en-GB', { month: 'long', timeZone: 'UTC' }).format(date)
  return `${weekday} ${ordinal(date.getUTCDate())} ${month}`
}

export default function DatePicker({ roomId, checkIn, checkOut, setCheckIn, setCheckOut, today }) {
  const [month, setMonth] = useState(() => {
    const [year, month] = (checkIn || today).split('-').map(Number)
    return new Date(year, month - 1, 1)
  })
  const [feedback, setFeedback] = useState('')
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const cells = [
    ...Array((new Date(year, monthIndex, 1).getDay() + 6) % 7).fill(null),
    ...Array.from({ length: new Date(year, monthIndex + 1, 0).getDate() }, (_, index) => index + 1),
  ]
  const singleNight = checkIn && checkOut === nextDay(checkIn)

  function choose(date) {
    const occupied = isRoomDateOccupied(roomId, date)
    if (occupied) { setFeedback('Booked / unavailable'); return }
    if (date < today) { setFeedback('Choose a future date.'); return }
    if (checkIn && date === checkIn) {
      setCheckIn('')
      setCheckOut('')
      setFeedback('Dates cleared. Choose a new check-in date.')
      return
    }
    if (!checkIn) {
      setCheckIn(date)
      setCheckOut(nextDay(date))
      setFeedback('')
      return
    }
    if (date < checkIn) { setFeedback('Choose a date after check-in.'); return }
    if (date === checkOut) { setFeedback(''); return }
    if (!isAvailable(roomId, checkIn, date)) { setFeedback('Those dates include a booked night. Choose an earlier checkout.'); return }
    setCheckOut(date)
    setFeedback('')
  }

  return <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
    <div className="flex items-center justify-between">
      <div><p className="text-[9px] uppercase tracking-[.16em] text-[#77786f]">Choose your dates</p><p className="mt-2 text-sm">{checkIn ? formatDate(checkIn) : 'Select check-in'}</p></div>
      <div className="flex gap-2"><button type="button" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">&larr;</button><button type="button" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">&rarr;</button></div>
    </div>
    <p className="mt-6 text-center font-[Playfair_Display] text-lg">{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)}</p>
    <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => <span key={day} className="py-2 text-[9px] uppercase tracking-wider text-[#85877d]">{day}</span>)}
      {cells.map((day, index) => {
        if (!day) return <span key={`blank-${index}`} />
        const date = toISO(year, monthIndex, day)
        const booked = isRoomDateOccupied(roomId, date)
        const past = date < today
        const beforeStart = Boolean(checkIn && date < checkIn)
        const selectedStart = date === checkIn
        const selectedEnd = Boolean(checkOut && date === checkOut && !singleNight)
        const inRange = Boolean(checkIn && checkOut && !singleNight && date > checkIn && date < checkOut)
        const disabled = booked || past || beforeStart
        const style = booked
          ? 'border border-red-300 bg-red-100 font-semibold text-red-800 line-through'
          : selectedStart || selectedEnd
            ? 'bg-[#253c32] text-white'
            : inRange ? 'rounded-none bg-[#e7ece7] text-[#253c32]' : ''
        return <button key={date} type="button" aria-disabled={disabled} aria-pressed={selectedStart || selectedEnd || inRange} aria-label={`${date}${booked ? ', booked / unavailable' : beforeStart ? ', before check-in' : ''}`} title={booked ? 'Booked / unavailable' : undefined} onClick={() => choose(date)} className={`group relative mx-auto grid h-10 w-10 place-items-center rounded-full text-sm transition ${style} ${disabled ? 'cursor-not-allowed' : 'hover:bg-[#f0efe9]'}`}>
          {day}
          {booked && <span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-32 -translate-x-1/2 rounded bg-[#253c32] px-2 py-1 text-[9px] font-normal text-white opacity-0 shadow transition group-hover:opacity-100 group-focus-visible:opacity-100">Booked / unavailable</span>}
        </button>
      })}
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-[#77786f]"><span className="inline-flex items-center gap-2"><span className="grid h-6 w-6 place-items-center rounded-full border border-red-300 bg-red-100 font-semibold text-red-800 line-through">8</span>Booked / unavailable</span><span>Click the selected check-in again to clear dates.</span></div>
    {feedback && <p role="status" className="mt-3 text-xs text-[#9b3030]">{feedback}</p>}
    <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/10 pt-4 text-[10px] text-[#77786f]"><div>CHECK-IN<p className="mt-1 text-xs font-medium text-[#222622]">{checkIn ? `${formatDate(checkIn)} · 2:00 PM` : 'Select a date'}</p></div><div className="text-right">CHECK-OUT<p className="mt-1 text-xs font-medium text-[#222622]">{checkOut ? `${formatDate(checkOut)} · 12:00 PM` : 'Select a date'}</p></div></div>
  </div>
}
