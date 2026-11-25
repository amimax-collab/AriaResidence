import { address, mapUrl, phone, whatsapp } from '../../data/contact'

export default function ContactPage({ sent, setSent }) {
  function sendMessage(event) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const message = `Hello Aria Residence, my name is ${values.get('name')}. Email: ${values.get('email')}. ${values.get('message')}`
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const email = import.meta.env.VITE_CONTACT_EMAIL
  const instagram = import.meta.env.VITE_INSTAGRAM_URL

  return <main className="mx-auto min-h-[65vh] max-w-7xl px-5 py-14 lg:px-10 lg:py-20">
    <p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">We're right here</p>
    <h1 className="mt-3 max-w-3xl font-[Playfair_Display] text-5xl leading-tight sm:text-6xl">Let's talk about your stay.</h1>
    <p className="mt-5 max-w-xl text-sm leading-7 text-[#656b63]">Ask about dates, arrival details, or anything that would make your time in Abuja easier. Our host team is ready to help.</p>
    <div className="mt-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
      <section className="space-y-4">
        <a href={mapUrl} target="_blank" rel="noreferrer" className="block border border-black/10 bg-white p-6 transition hover:border-[#253c32]"><p className="text-[9px] uppercase tracking-[.17em] text-[#85877d]">Visit</p><p className="mt-3 max-w-sm text-sm leading-6">{address}</p><span className="mt-4 inline-block border-b border-[#253c32] pb-1 text-xs">Get directions &rarr;</span></a>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={`tel:${phone}`} className="border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[.17em] text-[#85877d]">Call us</p><p className="mt-2 text-sm">{phone}</p></a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer" className="border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[.17em] text-[#85877d]">WhatsApp</p><p className="mt-2 text-sm">Message Aria Residence</p></a>
          <div className="border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[.17em] text-[#85877d]">Email</p>{email ? <a className="mt-2 block text-sm underline" href={`mailto:${email}`}>{email}</a> : <p className="mt-2 text-sm text-[#77786f]">Email details coming soon</p>}</div>
          <div className="border border-black/10 bg-white p-5"><p className="text-[9px] uppercase tracking-[.17em] text-[#85877d]">Instagram</p>{instagram ? <a className="mt-2 block text-sm underline" href={instagram} target="_blank" rel="noreferrer">Follow Aria Residence</a> : <p className="mt-2 text-sm text-[#77786f]">Instagram link coming soon</p>}</div>
        </div>
      </section>
      <form onSubmit={sendMessage} className="border border-black/10 bg-white p-6 sm:p-8">
        <p className="text-[10px] uppercase tracking-[.18em] text-[#85877d]">Send an enquiry</p>
        <h2 className="mt-2 font-[Playfair_Display] text-3xl">How can we help?</h2>
        {sent && <p role="status" className="mt-4 bg-[#e7ece7] p-3 text-xs">Your message is ready in WhatsApp. Tap send there to reach our host.</p>}
        <label className="mt-6 block text-[9px] uppercase tracking-[.15em]">Your name<input required name="name" autoComplete="name" className="mt-2 block w-full border-b border-black/20 py-3 text-sm normal-case tracking-normal outline-none" /></label>
        <label className="mt-5 block text-[9px] uppercase tracking-[.15em]">Email address<input required name="email" type="email" autoComplete="email" className="mt-2 block w-full border-b border-black/20 py-3 text-sm normal-case tracking-normal outline-none" /></label>
        <label className="mt-5 block text-[9px] uppercase tracking-[.15em]">Your message<textarea required name="message" rows="4" className="mt-2 block w-full resize-y border-b border-black/20 py-3 text-sm normal-case tracking-normal outline-none" /></label>
        <button className="mt-7 rounded-full bg-[#253c32] px-7 py-4 text-xs text-white">Continue in WhatsApp &rarr;</button>
      </form>
    </div>
  </main>
}
