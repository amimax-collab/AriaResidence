import FAQ from '../../components/faq/FAQ'
import { formatNaira } from '../../data/rooms'

const mapUrl = 'https://maps.app.goo.gl/t8eYevwFug1v3uaM6?g_st=ic'
const fullDate = (value) => new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))

export default function ConfirmationPage({ booking, room, setView }) {
  const paid = booking.paymentStatus === 'paid'
  return <main className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
    <section className="mx-auto max-w-2xl text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e5eee8] text-xl text-[#253c32]">{paid ? '✓' : 'OK'}</div>
      <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-[#85877d]">{paid ? 'Payment successful' : 'Request received'}</p>
      <h1 className="mt-3 font-[Playfair_Display] text-4xl sm:text-5xl">{paid ? 'Your stay is confirmed.' : 'Welcome to Aria Residence.'}</h1>
      <p className="mt-5 text-sm leading-7 text-[#656b63]">Thank you, {booking.name}, for choosing us. {paid ? 'We look forward to welcoming you to Abuja.' : 'We have received your booking request. Our team will contact you to confirm your stay.'}</p>
    </section>

    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.8fr]">
      <section className="border border-black/10 bg-white p-6 sm:p-8">
        <p className="text-[9px] uppercase tracking-[.17em] text-[#77786f]">Booking reference</p><p className="mt-1 font-[Playfair_Display] text-2xl">{booking.reference}</p>
        <div className="mt-6 space-y-4 border-t border-black/10 pt-5 text-sm">
          <p className="flex justify-between gap-4"><span>Residence</span><span className="text-right">{room.name}</span></p>
          <div className="grid gap-4 sm:grid-cols-2"><div><p className="text-xs text-[#77786f]">CHECK-IN · 2:00 PM</p><p className="mt-1 font-medium">{fullDate(booking.checkIn)}</p></div><div><p className="text-xs text-[#77786f]">CHECK-OUT · 12:00 PM</p><p className="mt-1 font-medium">{fullDate(booking.checkOut)}</p></div></div>
          <p className="flex justify-between border-t border-black/10 pt-4"><span>Guests</span><span>{booking.guests}</span></p>
          <p className="flex justify-between border-t border-black/10 pt-4 font-medium"><span>Total</span><span>{formatNaira(booking.total)}</span></p>
        </div>
        {!paid && <p className="mt-5 bg-[#f5f2eb] p-4 text-xs leading-5 text-[#656b63]">This is a booking request, not a paid or confirmed reservation. Please wait for our team to confirm availability.</p>}
      </section>

      <section className="border border-black/10 bg-white p-6 sm:p-8"><p className="text-[9px] uppercase tracking-[.17em] text-[#77786f]">Before you arrive</p><h2 className="mt-2 font-[Playfair_Display] text-2xl">A few house notes</h2><ul className="mt-5 space-y-3 text-sm leading-6 text-[#656b63]"><li>• Bring a valid ID for guest verification at check-in.</li><li>• The residence is for the registered guests on your booking; please check with the host before inviting visitors.</li><li>• Keep noise low at night and respect neighbours and shared spaces.</li><li>• No parties or smoking indoors.</li><li>• Please let the host know promptly if you need help or notice anything that needs attention.</li></ul><a href={mapUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-[#253c32] px-6 py-4 text-xs text-white">Get directions to Aria &rarr;</a></section>
    </div>
    <FAQ compact paid={paid} />
    <div className="mt-8 text-center"><button onClick={() => setView('home')} className="border-b border-[#253c32] pb-2 text-xs">Back to Aria Residence</button></div>
  </main>
}
