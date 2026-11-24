export default function Footer({ setView }) {
  return <footer className="bg-[#253c32] px-5 py-10 text-white"><div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-end sm:justify-between lg:px-5">
    <div><span className="font-[Playfair_Display] text-3xl tracking-[-.07em]">aria</span><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-white/55">A softer place to land</p></div>
    <div className="flex gap-6 text-xs text-white/75"><button onClick={() => setView('stays')}>Residences</button><button onClick={() => setView('about')}>Our story</button><button onClick={() => setView('contact')}>Contact</button><button onClick={() => setView('admin')}>Host dashboard</button></div>
    <p className="text-[10px] text-white/45">Aria Residence · Abuja, Nigeria</p>
  </div></footer>
}
