import { useState } from 'react'

export default function Header({ view, setView }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [['home', 'The stay'], ['stays', 'Residences'], ['about', 'Our story'], ['contact', 'Contact']]
  return <header className="relative z-20 border-b border-black/5 bg-[#f8f7f4]">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
      <button onClick={() => setView('home')} className="text-left leading-none" aria-label="Aria Residence home"><span className="font-[Playfair_Display] text-3xl tracking-[-.07em]">aria</span><span className="ml-2 text-[9px] tracking-[.22em] text-[#77786f]">RESIDENCE</span></button>
      <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full border border-black/10 px-4 py-2 text-xs md:hidden">{menuOpen ? 'Close' : 'Menu'}</button>
      <nav className={`${menuOpen ? 'absolute left-0 right-0 top-full flex flex-col gap-5 border-b bg-[#f8f7f4] p-6' : 'hidden'} items-center gap-9 text-[11px] uppercase tracking-[.12em] md:flex`}>{links.map(([id, label]) => <button key={id} onClick={() => { setView(id); setMenuOpen(false) }} aria-current={view === id ? 'page' : undefined}>{label}</button>)}</nav>
      <button onClick={() => setView('stays')} className="hidden rounded-full bg-[#253c32] px-6 py-3 text-xs text-white transition hover:bg-[#385346] md:block">Find your stay <span className="ml-3">-&gt;</span></button>
    </div>
  </header>
}
