export default function AboutPage({ setView }) {
  return <main className="mx-auto max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
    <section className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
      <div><p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">Our story</p><h1 className="mt-3 font-[Playfair_Display] text-5xl leading-tight sm:text-6xl">A softer landing in Abuja.</h1></div>
      <p className="max-w-2xl text-base leading-8 text-[#656b63]">Aria Residence is a collection of private stays in Apo, created for travellers who want the ease of a home and the care of a thoughtful host. Whether you are here for work, family, or a few days to reset, we want the space to feel calm from the moment you arrive.</p>
    </section>
    <section className="mt-14 grid gap-px bg-black/10 sm:grid-cols-3">
      {[["Feel at home", 'Private spaces with room to rest, cook, work, and make your own routine.'], ['Thoughtful details', 'Useful comforts make everyday moments simpler, from Wi-Fi to a dedicated workspace.'], ['Here when you need us', 'Our local team can help with arrival questions and the details of your stay.']].map(([title, text]) => <article key={title} className="bg-[#f8f7f4] p-7 sm:p-9"><h2 className="font-[Playfair_Display] text-2xl">{title}</h2><p className="mt-4 text-sm leading-7 text-[#656b63]">{text}</p></article>)}
    </section>
    <section className="mt-14 flex flex-col justify-between gap-6 bg-[#253c32] p-8 text-white sm:flex-row sm:items-center sm:p-12"><div><p className="text-[10px] uppercase tracking-[.2em] text-white/60">Apo, Abuja</p><h2 className="mt-3 font-[Playfair_Display] text-3xl">Make room for your stay.</h2></div><button onClick={() => setView('stays')} className="w-fit rounded-full bg-white px-7 py-4 text-xs text-[#253c32]">Explore residences &rarr;</button></section>
  </main>
}
