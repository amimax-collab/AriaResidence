export const rooms = [
  { id: 'aria-studio', name: 'Aria Studio', type: 'Studio', guests: 2, beds: 1, baths: 1, rate: 60000, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85', note: 'A calm, considered space for one or two.' },
  { id: 'classic-one-bed', name: 'Classic One Bedroom', type: 'One bedroom', guests: 2, beds: 1, baths: 1, rate: 85000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', note: 'A comfortable home base with room to settle in.' },
  { id: 'deluxe-one-bed', name: 'Deluxe One Bedroom', type: 'One bedroom', guests: 2, beds: 1, baths: 1, rate: 105000, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', note: 'More room, extra light, and a little more luxury.' },
  { id: 'comfort-two-bed', name: 'Comfort Two Bedroom', type: 'Two bedroom', guests: 4, beds: 2, baths: 2, rate: 145000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85', note: 'A generous layout for families and friends.' },
  { id: 'family-two-bed', name: 'Family Two Bedroom', type: 'Two bedroom', guests: 5, beds: 2, baths: 2, rate: 165000, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85', note: 'A little extra space for the whole family.' },
  { id: 'aria-penthouse', name: 'Aria Penthouse', type: 'Three bedroom', guests: 6, beds: 3, baths: 3, rate: 220000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', note: 'Our most spacious stay, made for special occasions.' },
]

export const extras = [
  { id: 'transfer', name: 'Airport pickup', rate: 45000 },
  { id: 'breakfast', name: 'Breakfast basket', rate: 18000 },
  { id: 'late-checkout', name: 'Late check-out', rate: 25000 },
]

export const formatNaira = (amount) => `₦${Number(amount).toLocaleString('en-NG')}`

export function isAvailable(roomId, checkIn, checkOut) {
  if (!checkIn || !checkOut) return true
  const bookings = JSON.parse(localStorage.getItem('aria-bookings') || '[]')
  const blocked = JSON.parse(localStorage.getItem('aria-blocked') || '[]')
  return ![...bookings, ...blocked].some((item) => {
    const start = item.checkIn || item.from
    const end = item.checkOut || item.to
    return (item.unitId === roomId || item.roomId === roomId) && checkIn < end && checkOut > start
  })
}

export function getAvailableTodayCount() {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date())
  const bookings = JSON.parse(localStorage.getItem('aria-bookings') || '[]')
  const blocked = JSON.parse(localStorage.getItem('aria-blocked') || '[]')
  return rooms.filter((room) => {
    const hasBooking = bookings.some((item) => (item.roomId === room.id || item.unitId === room.id) && item.status !== 'Cancelled' && item.checkIn <= today && today < item.checkOut)
    const isBlocked = blocked.some((item) => (item.roomId === room.id || item.unitId === room.id) && item.from <= today && today < item.to)
    return !hasBooking && !isBlocked
  }).length
}
