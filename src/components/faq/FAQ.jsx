const general = [
  ['What time are check-in and check-out?', 'Check-in is from 2:00 PM and check-out is by 12:00 PM.'],
  ['When is my booking confirmed?', 'A booking request is not confirmed until our team contacts you and confirms the dates.'],
  ['How do I get to Aria Residence?', 'We are at 2962 John Agaba Street, Apo, Abuja. Use the directions link on this page or contact us for help.'],
  ['Can I request a different check-in time?', 'Send us a message before arrival. Early check-in or late checkout depends on availability.'],
]

const confirmed = [
  ['What time should I arrive?', 'Your check-in time is from 2:00 PM. Please message us if your arrival time changes.'],
  ['How do I get directions?', 'Use the Google Maps directions link on this page. Our host can also help you find the residence.'],
  ['Can I bring extra visitors?', 'Please confirm any additional visitors with the host before they arrive. The booking guest limit still applies.'],
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
