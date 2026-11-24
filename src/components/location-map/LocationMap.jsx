const address = 'The Aria Residence, 2962 John Agaba street, Apo, Abuja 900104, Federal Capital Territory Abuja, Nigeria'
const directionsUrl = 'https://maps.app.goo.gl/t8eYevwFug1v3uaM6?g_st=ic'
const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`

export default function LocationMap() {
  return <section className="bg-[#e9ece6] px-5 py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-5">
    <div><p className="text-[10px] uppercase tracking-[.2em] text-[#71766d]">Find your way here</p><h2 className="mt-3 font-[Playfair_Display] text-4xl tracking-[-.04em]">Apo, Abuja.</h2><p className="mt-4 max-w-sm text-sm leading-7 text-[#656b63]">{address}</p><a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block border-b border-[#253c32] pb-2 text-xs">Get directions -&gt;</a></div>
    <iframe title="Map to The Aria Residence in Apo, Abuja" src={embedUrl} loading="lazy" className="h-72 w-full border-0 sm:h-96" referrerPolicy="no-referrer-when-downgrade"/>
  </div></section>
}
