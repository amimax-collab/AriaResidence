import StayCard from '../../components/stay-card/StayCard'
import { formatDay } from '../../utils/dates'


export default function ResidencesPage({ rooms, availableCount, checkIn, onDetails, onReserve, setView }) {
  return <main className="mx-auto min-h-[65vh] max-w-7xl px-5 py-14 lg:px-10"><p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">{availableCount} {availableCount === 1 ? 'residence' : 'residences'} available {checkIn ? `on ${formatDay(checkIn)}` : 'today'}</p><h1 className="mt-3 font-[Playfair_Display] text-5xl tracking-[-.04em]">Our residences</h1>
    {rooms.length ? <div className="mt-9 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{rooms.map((room, i) => <StayCard key={room.id} room={room} index={i} onDetails={() => onDetails(room)} onReserve={() => onReserve(room)}/>)}</div> : <p className="mt-8 text-sm">No residences fit those dates and guests. <button onClick={() => setView('home')} className="underline">Change search</button></p>}
  </main>
}
