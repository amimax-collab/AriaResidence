import { useState } from 'react'
import { isAvailable, isRoomDateOccupied } from '../../data/rooms'
import { CHECK_IN_TIME, CHECK_OUT_TIME, formatDay, nextDay, toISO } from '../../utils/dates'

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default function DatePicker({ roomId, checkIn, checkOut, setCheckIn, setCheckOut, today }) {
  const [month, setMonth] = useState(() => {
    const [year, monthNumber] = (checkIn || today).split('-').map(Number)
    return new Date(year, monthNumber - 1, 1)
  })
  const [feedback, setFeedback] = useState('')
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const cells = [
    ...Array((new Date(year, monthIndex, 1).getDay() + 6) % 7).fill(null),
    ...Array.from({ length: new Date(year, monthIndex + 1, 0).getDate() }, (_, index) => index + 1),
  ]
  // One night = only the check-in day is highlighted (check-out is the next morning at 12 PM).
  const singleNight = Boolean(checkIn && checkOut === nextDay(checkIn))
  const hasRange = Boolean(checkIn && checkOut && !singleNight)

  function choose(date) {
    if (isRoomDateOccupied(roomId, date)) { setFeedback('That date is already booked.'); return }
    if (date < today) { setFeedback('Choose a future date.'); return }
    if (checkIn && date === checkIn) { setCheckIn(''); setCheckOut(''); setFeedback(''); return }
    if (!checkIn) { setCheckIn(date); setCheckOut(nextDay(date)); setFeedback(''); return }
    if (date < checkIn) { setFeedback('Choose a date after check-in.'); return }
    if (date === checkOut) { setFeedback(''); return }
    if (!isAvailable(roomId, checkIn, date)) { setFeedback('Those dates include a booked night.'); return }
    setCheckOut(date)
    setFeedback('')
  }

  return <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
    <div className="flex items-center justify-between">
      <button type="button" onClick={() => setMonth(new Date(year, monthIndex - 1, 1))} aria-label="Previous month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">&larr;</button>
      <p className="font-[Playfair_Display] text-lg">{new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(month)}</p>
      <button type="button" onClick={() => setMonth(new Date(year, monthIndex + 1, 1))} aria-label="Next month" className="grid h-9 w-9 place-items-center rounded-full border border-black/10 hover:bg-[#f0efe9]">&rarr;</button>
    </div>

    <div className="mt-5 grid grid-cols-7 text-center">
      {WEEKDAYS.map((day) => <span key={day} className="py-2 text-[9px] uppercase tracking-wider text-[#85877d]">{day}</span>)}
      {cells.map((day, index) => {
        if (!day) return <span key={`blank-${index}`} />
        const date = toISO(year, monthIndex, day)
        const booked = isRoomDateOccupied(roomId, date)
        const past = date < today
        const beforeStart = Boolean(checkIn && date < checkIn)
        const isStart = date === checkIn
        const isEnd = hasRange && date === checkOut
        const inRange = hasRange && date > checkIn && date < checkOut
        const disabled = booked || past || beforeStart

        // The band sits behind the circles so the whole range reads as one continuous strip:
        // full width in the middle, right half on the first day, left half on the last day.
        const bandSide = inRange ? 'inset-x-0' : isStart ? 'left-1/2 right-0' : 'left-0 right-1/2'
        const showBand = hasRange && (inRange || isStart || isEnd)

        const look = isStart || isEnd
          ? 'bg-[#253c32] text-white'
          : booked
            ? 'bg-red-50 text-red-700 line-through'
            : past
              ? 'text-[#b4b5ae]'
              : inRange
                ? 'text-[#253c32]'
                : 'hover:bg-[#f0efe9]'

        return <div key={date} className="relative flex h-10 items-center justify-center">
          {showBand && <span aria-hidden="true" className={`absolute inset-y-0 ${bandSide} bg-[#e7ece7]`} />}
          <button
            type="button"
            aria-disabled={disabled}
            aria-pressed={isStart || isEnd || inRange}
            aria-label={`${formatDay(date)}${booked ? ', booked' : past ? ', past date' : ''}`}
            onClick={() => choose(date)}
            className={`relative z-10 grid h-10 w-10 place-items-center rounded-full text-sm transition ${look} ${disabled ? 'cursor-not-allowed' : ''}`}
          >{day}</button>
        </div>
      })}
    </div>

    {feedback && <p role="status" className="mt-3 text-center text-xs text-[#9b3030]">{feedback}</p>}

    <div className="mt-5 grid grid-cols-2 gap-4 border-t border-black/10 pt-5">
      {[['Check-in', checkIn, CHECK_IN_TIME], ['Check-out', checkOut, CHECK_OUT_TIME]].map(([label, value, time], index) => <div key={label} className={index ? 'text-right' : ''}>
        <p className="text-[10px] uppercase tracking-[.16em] text-[#77786f]">{label}</p>
        <p className="mt-1.5 text-sm font-medium leading-5">{value ? formatDay(value) : 'Select a date'}</p>
        {value && <p className="mt-0.5 text-xs text-[#77786f]">{time}</p>}
      </div>)}
    </div>
  </div>
}