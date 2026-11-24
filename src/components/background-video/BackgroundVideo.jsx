import { useEffect, useRef } from 'react'

const VIDEO_URL = 'https://videos.pexels.com/video-files/40807458/17436301_3840_2160_30fps.mp4'
const POSTER_URL = 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85'

export default function BackgroundVideo() {
  const video = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pause = () => reduceMotion.matches ? video.current?.pause() : video.current?.play().catch(() => {})
    pause()
    reduceMotion.addEventListener?.('change', pause)
    return () => reduceMotion.removeEventListener?.('change', pause)
  }, [])

  return <video ref={video} autoPlay muted loop playsInline preload="metadata" poster={POSTER_URL} aria-hidden="true" className="absolute inset-0 h-full w-full object-cover">
    <source src={VIDEO_URL} type="video/mp4"/>
  </video>
}
