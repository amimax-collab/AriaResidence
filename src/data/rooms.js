export const rooms = [
  { id: 'aria-studio', name: 'Aria Studio', type: 'Studio', guests: 2, beds: 1, baths: 1, rate: 60000, image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85', note: 'A calm, considered space for one or two.', description: 'One open, well-organised room that brings sleeping, working and relaxing together. Ideal for solo travellers and couples on a short Abuja trip.' },
  { id: 'classic-one-bed', name: 'Classic One Bedroom', type: 'One bedroom', guests: 2, beds: 1, baths: 1, rate: 85000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', note: 'A comfortable home base with room to settle in.', description: 'A separate bedroom and living area give you space to unwind after a long day, with everything you need for a week or more in the city.' },
  { id: 'deluxe-one-bed', name: 'Deluxe One Bedroom', type: 'One bedroom', guests: 2, beds: 1, baths: 1, rate: 105000, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85', note: 'More room, extra light, and a little more luxury.', description: 'A step up in space and finish for guests who want a little more room to breathe, host a quiet dinner, or work comfortably.' },
  { id: 'comfort-two-bed', name: 'Comfort Two Bedroom', type: 'Two bedroom', guests: 4, beds: 2, baths: 2, rate: 145000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85', note: 'A generous layout for families and friends.', description: 'Two bedrooms and two bathrooms keep everyone comfortable and private, with a shared living space to come together at the end of the day.' },
  { id: 'family-two-bed', name: 'Family Two Bedroom', type: 'Two bedroom', guests: 5, beds: 2, baths: 2, rate: 165000, image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85', note: 'A little extra space for the whole family.', description: 'Made for families, with room for up to five guests, two bathrooms and a kitchen for easy meals at your own pace.' },
  { id: 'aria-penthouse', name: 'Aria Penthouse', type: 'Three bedroom', guests: 6, beds: 3, baths: 3, rate: 220000, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85', note: 'Our most spacious stay, made for special occasions.', description: 'Our largest residence: three bedrooms, three bathrooms and generous living space for group trips, family gatherings and special occasions.' },
]

export const amenityGroups = [
  { title: 'Entertainment', items: ['Smart TV', 'Netflix', 'YouTube'] },
  { title: 'Comfort', items: ['Air conditioning', 'Wi-Fi', 'Dedicated workspace'] },
  { title: 'Convenience', items: ['Parking space', 'Fully equipped kitchen'] },
]

export const extras = [
  { id: 'transfer', name: 'Airport pickup', rate: 45000 },
  { id: 'breakfast', name: 'Breakfast basket', rate: 18000 },
  { id: 'late-checkout', name: 'Late check-out', rate: 25000 },
]

export const formatNaira = (amount) => `\u20a6${Number(amount).toLocaleString('en-NG')}`

const getLocalRecords = (key) => {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

const activeRecords = () => [
  ...getLocalRecords('aria-bookings').filter((item) => String(item.status || '').toLowerCase() !== 'cancelled'),
  ...getLocalRecords('aria-blocked'),
]

export function isRoomDateOccupied(roomId, date) {
  return activeRecords().some((item) => {
    const start = item.checkIn || item.from
    const end = item.checkOut || item.to
    const belongsToRoom = item.unitId === roomId || item.roomId === roomId
    return belongsToRoom && start && end && start <= date && date < end
  })
}

export function isAvailable(roomId, checkIn, checkOut) {
  if (!checkIn || !checkOut) return true
  return !activeRecords().some((item) => {
    const start = item.checkIn || item.from
    const end = item.checkOut || item.to
    const belongsToRoom = item.unitId === roomId || item.roomId === roomId
    return belongsToRoom && start && end && checkIn < end && checkOut > start
  })
}

// How many residences are free on a given night (YYYY-MM-DD).
export function getAvailableCount(date) {
  return rooms.filter((room) => !isRoomDateOccupied(room.id, date)).length
}