import FAQ from '../../components/faq/FAQ'
import { address, mapUrl, phone, whatsapp } from '../../data/contact'
import { formatNaira } from '../../data/rooms'
import { CHECK_IN_TIME, CHECK_OUT_TIME, formatDay } from '../../utils/dates'

// Common shortlet rules in Abuja. Edit these to match Aria Residence's own policy.
const houseRules = [
  'A valid ID (NIN, international passport, driver\u2019s licence or voter\u2019s card) is required for every adult guest at check-in.',
  `Check-in is from ${CHECK_IN_TIME} and check-out is by ${CHECK_OUT_TIME}. Late check-out depends on availability and may attract a fee.`,
  'Only the guests registered on your booking may stay overnight. Please get the host\u2019s approval before any visitor arrives.',
  'Quiet hours are 10:00 PM to 6:00 AM. No parties, events or loud gatherings.',
  'No smoking (including shisha and vaping) indoors, and no illegal substances on the premises.',
  'Do not exceed the maximum number of guests for your residence.',
  'Please look after the apartment. Guests are responsible for any damage or missing items during their stay.',
  'Switch off the AC, lights and appliances when you leave, and use water and power sensibly.',
  'Park only in the space you are given and keep shared areas tidy.',
  'No pets unless agreed with the host in advance.',
]

export default function ConfirmationPage({ booking, room, setView }) {
  const stay = [['Check-in', booking.checkIn, CHECK_IN_TIME], ['Check-out', booking.checkOut, CHECK_OUT_TIME]]

  return <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
    <section className="mx-auto max-w-2xl text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eee8] text-xl text-[#253c32]">&#10003;</div>
      <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#85877d]">Booking confirmed</p>
      <h1 className="mt-3 font-[Playfair_Display] text-4xl sm:text-5xl">Welcome to Aria Residence.</h1>
      <p className="mt-5 text-sm leading-7 text-[#656b63]">Thank you, {booking.name}. {room.name} is yours for your stay, and we can&rsquo;t wait to welcome you to Abuja.</p>
    </section>

    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.8fr]">
      <section className="border border-black/10 bg-white p-6 sm:p-8">
        <p className="text-[9px] uppercase tracking-[.17em] text-[#77786f]">Booking reference</p><p className="mt-1 font-[Playfair_Display] text-2xl">{booking.reference}</p>
        <div className="mt-6 space-y-5 border-t border-black/10 pt-5 text-sm">
          <p className="flex justify-between gap-4"><span>Residence</span><span className="text-right">{room.name}</span></p>
          <div className="grid gap-5 border-t border-black/10 pt-5 sm:grid-cols-2">{stay.map(([label, value, time]) => <div key={label}>
            <p className="text-[10px] uppercase tracking-[.16em] text-[#77786f]">{label}</p>
            <p className="mt-2 font-[Playfair_Display] text-xl leading-snug">{formatDay(value, { year: true })}</p>
            <p className="mt-1 text-xs text-[#77786f]">{time}</p>
          </div>)}</div>
          <p className="flex justify-between border-t border-black/10 pt-5"><span>Guests</span><span>{booking.guests}</span></p>
          <p className="flex justify-between border-t border-black/10 pt-5 font-medium"><span>Total</span><span>{formatNaira(booking.total)}</span></p>
        </div>
      </section>

      <section className="border border-black/10 bg-white p-6 sm:p-8">
        <p className="text-[9px] uppercase tracking-[.17em] text-[#77786f]">Getting here</p>
        <h2 className="mt-2 font-[Playfair_Display] text-2xl">Directions</h2>
        <p className="mt-4 text-sm leading-6 text-[#656b63]">{address}</p>
        <a href={mapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-[#253c32] px-6 py-4 text-xs text-white">Get directions to Aria &rarr;</a>
        <div className="mt-6 flex flex-wrap gap-5 border-t border-black/10 pt-5 text-xs">
          <a href={`tel:${phone}`} className="border-b border-[#253c32] pb-1">Call the host</a>
          <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello Aria Residence, my booking reference is ${booking.reference}.`)}`} target="_blank" rel="noreferrer" className="border-b border-[#253c32] pb-1">WhatsApp the host</a>
        </div>
      </section>
    </div>

    <section className="mt-6 border border-black/10 bg-white p-6 sm:p-8">
      <p className="text-[9px] uppercase tracking-[.17em] text-[#77786f]">Before you arrive</p>
      <h2 className="mt-2 font-[Playfair_Display] text-2xl">House rules &amp; regulations</h2>
      <ul className="mt-6 grid gap-x-10 gap-y-4 text-sm leading-6 text-[#656b63] md:grid-cols-2">{houseRules.map((rule) => <li key={rule} className="flex gap-3"><span aria-hidden="true" className="text-[#253c32]">&bull;</span><span>{rule}</span></li>)}</ul>
    </section>

    <FAQ compact paid />
    <div className="mt-8 text-center"><button onClick={() => setView('home')} className="border-b border-[#253c32] pb-2 text-xs">Back to Aria Residence</button></div>
  </main>
}