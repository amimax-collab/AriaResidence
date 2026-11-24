import DatePicker from '../../components/date-picker/DatePicker'
import { formatNaira } from '../../data/rooms'

const facilities = ['Smart TV', 'Netflix', 'YouTube', 'Wi-Fi', 'Workspace', 'Air conditioning', 'Parking', 'Kitchen']

export default function DetailsPage({ room, checkIn, checkOut, setCheckIn, setCheckOut, guests, setGuests, today, notice, onReserve, setView }) {
  return <main className="mx-auto max-w-7xl px-5 py-10 lg:px-10">
    <button onClick={() => setView('stays')} className="mb-7 text-xs text-[#72766f]">&larr; All residences</button>
    <div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
      <section>
        <img src={room.image} alt={room.name} className="h-[300px] w-full rounded-2xl object-cover sm:h-[490px]" />
        <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#85877d]">{room.type} / Apo, Abuja</p>
        <h1 className="mt-2 font-[Playfair_Display] text-4xl sm:text-5xl">{room.name}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#656b63]">{room.note} Settle in with thoughtful comforts for a restful stay, focused work, and easy evenings in Abuja.</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">{facilities.map((item) => <div key={item} className="border border-black/10 bg-white px-4 py-4 text-xs">{item}</div>)}</div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">{[[`${room.guests} guests`, 'Maximum occupancy'], [`${room.beds} bed${room.beds > 1 ? 's' : ''}`, 'Sleeping space'], [`${room.baths} bathroom${room.baths > 1 ? 's' : ''}`, 'Private bathroom']].map(([title, label]) => <div key={label} className="border-t border-black/10 pt-4"><p className="font-[Playfair_Display] text-xl">{title}</p><p className="mt-1 text-xs text-[#77786f]">{label}</p></div>)}</div>
      </section>
      <aside className="h-fit rounded-2xl border border-black/10 bg-white p-5 sm:p-7 lg:sticky lg:top-6">
        <p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">Your stay</p>
        <p className="mt-2"><span className="font-[Playfair_Display] text-3xl">{formatNaira(room.rate)}</span><span className="text-xs text-[#77786f]"> / night</span></p>
        <DatePicker roomId={room.id} checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} today={today} />
        <label className="mt-5 block text-[9px] uppercase tracking-[.14em] text-[#77786f]">Guests<select value={guests} onChange={(event) => setGuests(Number(event.target.value))} className="mt-2 block w-full border-b border-black/15 bg-transparent py-3 text-sm normal-case tracking-normal">{Array.from({ length: room.guests }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count} guest{count > 1 ? 's' : ''}</option>)}</select></label>
        {notice && <p className="mt-4 text-xs text-red-700">{notice}</p>}
        <button onClick={onReserve} className="mt-6 w-full rounded-full bg-[#253c32] px-6 py-4 text-xs text-white transition hover:bg-[#385346]">Reserve this residence &rarr;</button>
        <p className="mt-4 text-center text-xs text-[#77786f]">No payment is taken at this step.</p>
      </aside>
    </div>
  </main>
}
