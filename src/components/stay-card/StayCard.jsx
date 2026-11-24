import { formatNaira } from '../../data/rooms'

export default function StayCard({ room, index, onDetails, onReserve }) {
  return <article className="group">
    <button onClick={onDetails} className="relative block w-full overflow-hidden text-left"><img src={room.image} alt={room.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.025]"/><span className="absolute left-4 top-4 bg-[#f8f7f4]/95 px-3 py-2 text-[9px] uppercase tracking-[.14em]">0{index + 1} / Abuja stays</span></button>
    <div className="flex items-start justify-between gap-3 pt-4"><button onClick={onDetails} className="text-left"><p className="text-[9px] uppercase tracking-[.16em] text-[#85877d]">{room.type} · Abuja</p><h3 className="mt-2 font-[Playfair_Display] text-xl tracking-[-.03em]">{room.name}</h3></button><p className="whitespace-nowrap text-right"><span className="font-[Playfair_Display] text-lg">{formatNaira(room.rate)}</span><span className="block text-[10px] text-[#85877d]">per night</span></p></div>
    <p className="mt-2 text-xs text-[#77786f]">{room.guests} guests · {room.beds} bed{room.beds > 1 ? 's' : ''} · {room.baths} bath{room.baths > 1 ? 's' : ''}</p><p className="mt-3 text-xs leading-5 text-[#656b63]">{room.note}</p>
    <button onClick={onReserve} className="mt-5 border-b border-[#253c32] pb-2 text-xs">View apartment &amp; reserve -&gt;</button>
  </article>
}
