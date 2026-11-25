import { useMemo, useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import WhatsAppButton from './components/whatsapp/WhatsAppButton'
import { extras, getAvailableCount, isAvailable, rooms } from './data/rooms'
import AboutPage from './pages/about/AboutPage'
import AdminPage from './pages/admin/AdminPage'
import ResidencesPage from './pages/residences/ResidencesPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import ContactPage from './pages/contact/ContactPage'
import ConfirmationPage from './pages/confirmation/ConfirmationPage'
import DetailsPage from './pages/details/DetailsPage'
import HomePage from './pages/home/HomePage'

export default function App() {
  const [view, setView] = useState('home')
  const [room, setRoom] = useState(rooms[0])
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [notice, setNotice] = useState('')
  const [booking, setBooking] = useState(null)
  const [contactSent, setContactSent] = useState(false)
  const [guest, setGuest] = useState({ name: '', email: '', phone: '', idType: 'National ID (NIN)', idNumber: '' })
  const [idFile, setIdFile] = useState(null)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [today] = useState(() => new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()))

  const nights = useMemo(() => checkIn && checkOut ? Math.max(0, (Date.parse(checkOut) - Date.parse(checkIn)) / 86400000) : 0, [checkIn, checkOut])
  const total = room.rate * nights + selectedExtras.reduce((sum, id) => sum + (extras.find((item) => item.id === id)?.rate || 0), 0)

  function openDetails(nextRoom) { setRoom(nextRoom); setGuests(Math.min(guests, nextRoom.guests)); setNotice(''); setView('details'); window.scrollTo(0, 0) }
  function reserve(nextRoom = room) {
    setRoom(nextRoom)
    setGuests(Math.min(guests, nextRoom.guests))
    if (!checkIn || !checkOut || nights < 1) { setNotice('Choose check-in and check-out dates first.'); setView('details'); return }
    if (!isAvailable(nextRoom.id, checkIn, checkOut)) { setNotice('Those dates are unavailable. Please choose another range.'); setView('details'); return }
    setNotice(''); setView('checkout'); window.scrollTo(0, 0)
  }
  // Saves the booking and shows the confirmation page.
  // Call it with { status: 'confirmed', paymentStatus: 'paid', paymentRef } from your payment provider's
  // success callback. Until payment is connected, bookings are saved as pending.
  function saveBooking(extra = {}) {
    if (!isAvailable(room.id, checkIn, checkOut)) { setNotice('Those dates were just taken. Please choose another range.'); setView('details'); return }
    const request = { ...guest, idNumber: `****${guest.idNumber.slice(-4)}`, roomId: room.id, checkIn, checkOut, guests, total, extras: selectedExtras, status: 'pending', paymentStatus: 'unpaid', reference: `ARIA-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, ...extra }
    const saved = JSON.parse(localStorage.getItem('aria-bookings') || '[]')
    localStorage.setItem('aria-bookings', JSON.stringify([...saved, request]))
    setBooking(request); setNotice(''); setView('confirmed'); window.scrollTo(0, 0)
  }
  function submitBooking(e) {
    e.preventDefault()
    if (!idFile) { setNotice('Please attach your ID to continue.'); return }
    saveBooking()
  }

  const availableRooms = rooms.filter((item) => (!checkIn || item.guests >= guests) && isAvailable(item.id, checkIn, checkOut))

  return <div className="min-h-screen bg-[#f8f7f4] font-[DM_Sans] text-[#222622]">
    <Header view={view} setView={setView}/>
    {view === 'home' && <HomePage rooms={rooms} onDetails={openDetails} onReserve={reserve} setView={setView}/>}
    {view === 'stays' && <ResidencesPage rooms={availableRooms} availableCount={getAvailableCount(checkIn || today)} checkIn={checkIn} onDetails={openDetails} onReserve={reserve} setView={setView}/>}
    {view === 'details' && <DetailsPage room={room} checkIn={checkIn} checkOut={checkOut} setCheckIn={setCheckIn} setCheckOut={setCheckOut} guests={guests} setGuests={setGuests} today={today} notice={notice} onReserve={() => reserve(room)} setView={setView}/>}
    {view === 'checkout' && <CheckoutPage room={room} dates={{checkIn,checkOut}} guests={guests} form={guest} setForm={setGuest} extrasSelected={selectedExtras} setExtrasSelected={setSelectedExtras} idFile={idFile} setIdFile={setIdFile} notice={notice} onSubmit={submitBooking} total={total} setView={setView}/>}
    {view === 'confirmed' && booking && <ConfirmationPage booking={booking} room={rooms.find((item) => item.id === booking.roomId) || room} setView={setView}/>}
    {view === 'about' && <AboutPage setView={setView}/>}
    {view === 'contact' && <ContactPage sent={contactSent} setSent={setContactSent}/>}
    {view === 'admin' && <AdminPage setView={setView}/>}
    <Footer setView={setView}/><WhatsAppButton/>
  </div>
}

