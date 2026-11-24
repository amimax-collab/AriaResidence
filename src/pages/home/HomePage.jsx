import { useRef } from 'react'
import BackgroundVideo from '../../components/background-video/BackgroundVideo'
import FAQ from '../../components/faq/FAQ'
import GuestReviews from '../../components/guest-reviews/GuestReviews'
import LocalConditions from '../../components/local-conditions/LocalConditions'
import LocationMap from '../../components/location-map/LocationMap'
import Reveal from '../../components/reveal/Reveal'
import StayCard from '../../components/stay-card/StayCard'

export default function HomePage({ rooms, onDetails, onReserve, setView }) {
  const rail = useRef(null)
  const scrollResidences = (direction) => rail.current?.scrollBy({ left: direction * (rail.current.clientWidth < 640 ? rail.current.clientWidth * 0.85 : rail.current.clientWidth / 3), behavior: 'smooth' })
  return <>
    <section className="relative isolate flex min-h-[min(780px,88svh)] items-center overflow-hidden bg-[#20241f] text-white">
      <BackgroundVideo/>
      <div className="absolute inset-0 -z-0 bg-gradient-to-r from-[#101611]/75 via-[#101611]/35 to-[#101611]/10"/>
      <LocalConditions/>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-24 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[.28em] text-white/75"><span className="h-px w-8 bg-white/70"/>Aria Residence · Abuja, Nigeria</p>
          <h1 className="font-[Playfair_Display] text-6xl leading-[.98] tracking-[-.055em] sm:text-8xl">Come in.<br/><em className="font-normal">Slow down.</em></h1>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/80 sm:text-base">A private place to land, breathe, and feel at home in Abuja.</p>
          <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => document.getElementById('residences')?.scrollIntoView({behavior:'smooth'})} className="rounded-full bg-white px-7 py-4 text-xs text-[#253c32] transition duration-300 hover:-translate-y-1 hover:bg-[#e9ece6]">Explore residences <span className="ml-3">-&gt;</span></button><button onClick={() => document.getElementById('location')?.scrollIntoView({behavior:'smooth'})} className="rounded-full border border-white/60 px-7 py-4 text-xs text-white transition duration-300 hover:-translate-y-1 hover:bg-white/10">Find us in Abuja</button></div>
        </Reveal>
      </div>
      <div className="absolute bottom-7 left-6 right-6 z-10 flex items-end justify-between text-[9px] uppercase tracking-[.2em] text-white/70 lg:left-10 lg:right-10"><span>Stay awhile</span><span className="hidden sm:block">A quieter kind of city stay</span><span>Abuja · 09° N</span></div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-6 px-5 py-20 sm:grid-cols-[.7fr_1.3fr] sm:py-28 lg:px-10">
      <Reveal><p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">A place of your own</p></Reveal>
      <Reveal delay={100}><p className="max-w-3xl font-[Playfair_Display] text-3xl leading-snug tracking-[-.035em] sm:text-5xl">Not just somewhere to stay. Somewhere to <em>settle in.</em></p><p className="mt-6 max-w-lg text-sm leading-7 text-[#656b63]">Thoughtful spaces, warm hosting, and room for your Abuja days to unfold at their own pace.</p></Reveal>
    </section>

    <section id="residences" className="bg-[#f0efe9] px-5 py-16 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-7xl"><Reveal className="mb-10 flex items-end justify-between gap-5"><div><p className="mb-3 text-[10px] uppercase tracking-[.22em] text-[#85877d]">Your Abuja address</p><h2 className="font-[Playfair_Display] text-4xl tracking-[-.04em] sm:text-5xl">Find your residence.</h2></div><div className="flex items-center gap-4"><div className="hidden gap-2 md:flex"><button onClick={() => scrollResidences(-1)} aria-label="Scroll residences left" className="h-10 w-10 rounded-full border border-black/15 transition hover:bg-white">&larr;</button><button onClick={() => scrollResidences(1)} aria-label="Scroll residences right" className="h-10 w-10 rounded-full border border-black/15 transition hover:bg-white">&rarr;</button></div><button onClick={() => setView('stays')} className="hidden border-b border-[#253c32] pb-2 text-xs md:block">See more</button></div></Reveal>
        <div className="grid gap-9 md:hidden">{rooms.slice(0, 3).map((room, index) => <Reveal key={room.id} delay={index * 90}><StayCard room={room} index={index} onDetails={() => onDetails(room)} onReserve={() => onReserve(room)}/></Reveal>)}</div>
        <button onClick={() => setView('stays')} className="mt-9 w-full rounded-full border border-[#253c32] px-6 py-4 text-xs md:hidden">See more rooms</button>
        <div ref={rail} className="hidden snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:thin] md:flex">{rooms.map((room, index) => <div key={room.id} className="w-[calc((100%_-_1.75rem)/2)] shrink-0 snap-start lg:w-[calc((100%_-_3.5rem)/3)]"><Reveal delay={(index % 3) * 90}><StayCard room={room} index={index} onDetails={() => onDetails(room)} onReserve={() => onReserve(room)}/></Reveal></div>)}</div>
      </div>
    </section>

    <section className="bg-[#253c32] px-5 py-16 text-white sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-3 lg:px-5">{[['01','Made for unwinding','Thoughtful comfort for work trips, weekends, and longer stays.'],['02','Room for your rhythm','A private place to settle into your own routine.'],['03','Local, helpful hosting','A real host to help with the details of your Abuja stay.']].map(([n,title,copy],i)=><Reveal key={n} delay={i*90} className="border-t border-white/20 pt-5"><p className="text-[10px] tracking-[.18em] text-white/55">{n}</p><h3 className="mt-4 font-[Playfair_Display] text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-white/70">{copy}</p></Reveal>)}</div></section>
    <div id="location"><LocationMap/></div>
    <FAQ />
    <GuestReviews/>
  </>
}
