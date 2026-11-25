import { rooms } from '../../data/rooms'
import { CHECK_IN_TIME, CHECK_OUT_TIME } from '../../utils/dates'

const values = [
  ['Feel at home', 'Private spaces with room to rest, cook, work, and make your own routine.'],
  ['Thoughtful details', 'Useful comforts make everyday moments simpler, from Wi-Fi to a dedicated workspace.'],
  ['Here when you need us', 'Our local team can help with arrival questions and the details of your stay.'],
]

const steps = [
  ['01', 'Choose your dates', 'Pick a residence and the nights you want. Booked dates are marked so you only see what is free.'],
  ['02', 'Book and pay', 'Add your details and ID, then pay online. Your dates are held for you once payment goes through.'],
  ['03', 'Arrive and settle in', `Check in from ${CHECK_IN_TIME}. Our host is a call or WhatsApp message away.`],
  ['04', 'Check out easily', `Check out by ${CHECK_OUT_TIME}. Need a little longer? Ask us about late check-out.`],
]

export default function AboutPage({ setView }) {
  const facts = [[String(rooms.length), 'Private residences'], ['Apo', 'Abuja, Nigeria'], [CHECK_IN_TIME, 'Check-in from'], [CHECK_OUT_TIME, 'Check-out by']]
  return <main className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
    <section className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
      <div><p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">Our story</p><h1 className="mt-3 font-[Playfair_Display] text-5xl leading-tight sm:text-6xl">A softer landing in Abuja.</h1></div>
      <p className="max-w-2xl text-base leading-8 text-[#656b63]">Aria Residence is a collection of private stays in Apo, created for travellers who want the ease of a home and the care of a thoughtful host. Whether you are here for work, family, or a few days to reset, we want the space to feel calm from the moment you arrive.</p>
    </section>

    <section className="mt-14 grid gap-10 lg:grid-cols-2">
      <div className="space-y-5 text-sm leading-7 text-[#656b63]">
        <h2 className="font-[Playfair_Display] text-3xl text-[#222622]">Why we started</h2>
        <p>Abuja is a city people visit for work, for family and for celebrations, and too often the place they stay feels like an afterthought. We wanted to offer something better: a private residence that feels settled from the first minute, without the noise and distance of a hotel.</p>
        <p>Every Aria residence is set up so you can live the way you normally do. Cook a meal, take a call at a proper desk, stream something in the evening, and sleep well. When you need a hand, a real person is there to help.</p>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-black/10 self-start">{facts.map(([value, label]) => <div key={label} className="bg-white p-6"><dt className="text-[10px] uppercase tracking-[.16em] text-[#85877d]">{label}</dt><dd className="mt-3 font-[Playfair_Display] text-3xl">{value}</dd></div>)}</dl>
    </section>

    <section className="mt-14 grid gap-px bg-black/10 sm:grid-cols-3">
      {values.map(([title, text]) => <article key={title} className="bg-[#f8f7f4] p-7 sm:p-9"><h2 className="font-[Playfair_Display] text-2xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#656b63]">{text}</p></article>)}
    </section>

    <section className="mt-14">
      <p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">How it works</p>
      <h2 className="mt-3 font-[Playfair_Display] text-3xl sm:text-4xl">Your stay, step by step.</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, text]) => <div key={number} className="border-t border-black/15 pt-5"><p className="text-[10px] tracking-[.18em] text-[#85877d]">{number}</p><h3 className="mt-3 font-[Playfair_Display] text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#656b63]">{text}</p></div>)}</div>
    </section>

    <section className="mt-14 flex flex-col justify-between gap-6 bg-[#253c32] p-8 text-white sm:flex-row sm:items-center sm:p-12"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Apo, Abuja</p><h2 className="mt-3 font-[Playfair_Display] text-3xl">Make room for your stay.</h2></div><button onClick={() => setView('stays')} className="w-fit rounded-full bg-white px-7 py-4 text-xs text-[#253c32]">Explore residences &rarr;</button></section>
  </main>
}