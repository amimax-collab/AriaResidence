import { useEffect, useState } from 'react'

const STORAGE_KEY = 'aria-reviews'

export default function GuestReviews() {
  const [reviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] }
  })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reviews.length < 2) return undefined
    const timer = window.setInterval(() => setActive((index) => (index + 1) % reviews.length), 5500)
    return () => window.clearInterval(timer)
  }, [reviews.length])

  function goTo(index) {
    setActive((index + reviews.length) % reviews.length)
  }

  const review = reviews[active]

  return <section aria-label="Guest reviews" className="bg-[#f8f7f4] px-5 py-16 sm:py-20">
    <div className="mx-auto max-w-7xl lg:px-5">
      <p className="text-[10px] uppercase tracking-[.2em] text-[#85877d]">Guest notes</p>
      <h2 className="mt-3 font-[Playfair_Display] text-4xl tracking-[-.04em] sm:text-5xl">Your stay, in your words.</h2>
      {review ? <div className="mt-9 min-h-56 border border-black/10 bg-white p-7 transition-all duration-700 sm:p-10" aria-live="polite">
        <p className="text-sm tracking-[.2em] text-[#a47e4c]" aria-label={`${review.rating} out of 5 stars`}>{'★'.repeat(Number(review.rating) || 5)}</p>
        <blockquote className="mt-5 max-w-3xl font-[Playfair_Display] text-2xl leading-relaxed sm:text-3xl">“{review.text}”</blockquote>
        <p className="mt-6 text-xs text-[#656b63]">{review.name}</p>
        {reviews.length > 1 && <div className="mt-7 flex items-center gap-3">
          <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous review" className="grid h-9 w-9 place-items-center rounded-full border border-black/15 transition hover:bg-[#253c32] hover:text-white">←</button>
          {reviews.map((item, index) => <button type="button" key={`${item.date}-${index}`} onClick={() => goTo(index)} aria-label={`Show review ${index + 1}`} aria-current={active === index} className={`h-2 rounded-full transition-all ${active === index ? 'w-6 bg-[#253c32]' : 'w-2 bg-[#253c32]/25'}`} />)}
          <button type="button" onClick={() => goTo(active + 1)} aria-label="Next review" className="grid h-9 w-9 place-items-center rounded-full border border-black/15 transition hover:bg-[#253c32] hover:text-white">→</button>
        </div>}
      </div> : <p className="mt-8 max-w-xl text-sm leading-7 text-[#656b63]">Guest reviews will appear here once guests share their experience.</p>}
    </div>
  </section>
}
