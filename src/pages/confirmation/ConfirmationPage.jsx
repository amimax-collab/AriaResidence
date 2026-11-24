import { formatNaira } from '../../data/rooms'

export default function ConfirmationPage({ booking, room, setView }) {
  return <main className="mx-auto min-h-[65vh] max-w-2xl px-5 py-20 text-center">
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5eee8] text-2xl text-[#253c32]">OK</div>
    <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#85877d]">Request received</p>
    <h1 className="mt-3 font-[Playfair_Display] text-5xl">Welcome to Aria Residence.</h1>
    <p className="mt-5 text-sm leading-7 text-[#656b63]">Thank you, {booking.name}, for choosing us. We have received your booking request and will be in touch about your stay in Abuja.</p>
    <div className="mt-10 border border-black/10 bg-white p-7 text-left">
      <p className="text-xs text-[#77786f]">BOOKING REFERENCE</p>
      <p className="mt-1 font-[Playfair_Display] text-2xl">{booking.reference}</p>
      <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
        <p className="flex justify-between"><span>Residence</span><span>{room.name}</span></p>
        <p className="flex justify-between"><span>Dates</span><span>{booking.checkIn} - {booking.checkOut}</span></p>
        <p className="flex justify-between"><span>Guests</span><span>{booking.guests}</span></p>
        <p className="flex justify-between border-t border-black/10 pt-4 font-medium"><span>Total</span><span>{formatNaira(booking.total)}</span></p>
      </div>
    </div>
    <button onClick={() => setView('home')} className="mt-8 rounded-full bg-[#253c32] px-8 py-4 text-xs text-white">Back to Aria</button>
  </main>
}
