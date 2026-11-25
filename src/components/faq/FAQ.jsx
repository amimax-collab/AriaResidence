const general = [
  ['What time are check-in and check-out?', 'Check-in is from 2:00 PM and check-out is by 12:00 PM.'],
  ['Is my room reserved once I book?', 'Yes. Once your booking is complete, those dates are held for you and no other guest can book them.'],
  ['What do I need to bring?', 'A valid ID (NIN, international passport, driver\u2019s licence or voter\u2019s card) for every adult guest.'],
  ['What is included in my stay?', 'Every residence has Wi-Fi, air conditioning, a Smart TV with Netflix and YouTube, a workspace, a kitchen and parking.'],
  ['How do I get to Aria Residence?', 'We are at 2962 John Agaba Street, Apo, Abuja. Use the directions link on this page or contact us for help.'],
  ['Can I request an early check-in or late check-out?', 'Send us a message before arrival. Early check-in and late check-out depend on availability.'],
]

const confirmed = [
  ['What time should I arrive?', 'Check-in is from 2:00 PM. Please message us if your arrival time changes.'],
  ['How do I get directions?', 'Use the directions button on this page. Our host can also guide you to the residence by phone or WhatsApp.'],
  ['What do I need at check-in?', 'A valid ID for every adult guest, and your booking reference.'],
  ['Can I check in early or check out late?', 'It depends on availability. Message the host before your stay and we will do our best.'],
  ['Can I bring extra visitors?', 'Please confirm any visitors with the host before they arrive. The guest limit on your booking still applies.'],
  ['I need to change my dates. What do I do?', 'Contact the host on WhatsApp or by phone with your booking reference as early as you can.'],
]

export default function FAQ({ compact = false, paid = false }) {
  const items = paid ? confirmed : general
  return <section className={compact ? 'mt-10' : 'bg-white px-5 py-16 sm:py-20'}>
    <div className={compact ? '' : 'mx-auto max-w-4xl'}>
      <p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">A few helpful details</p>
      <h2 className="mt-2 font-[Playfair_Display] text-3xl sm:text-4xl">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-black/10 border-y border-black/10">{items.map(([question, answer]) => <details key={question} className="group py-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:hidden">{question}<span className="text-lg text-[#85877d] transition group-open:rotate-45">+</span></summary>
        <p className="max-w-2xl pt-3 text-sm leading-6 text-[#656b63]">{answer}</p>
      </details>)}</div>
    </div>
  </section>
}