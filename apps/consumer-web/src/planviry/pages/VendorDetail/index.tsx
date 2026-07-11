import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@/planviry/router';
import { useApp } from '../../context/AppContext';
import { findVendorById } from '../../lib/vendorCatalog';
import { getVendorDetails } from '../../components/Layout';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  Send,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ActivityLog } from '../../types';

export const VendorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setActivities, showToast } = useApp();

  // States (declared before any early return to satisfy rules-of-hooks)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);

  // Custom reviews logic
  const [customReviews, setCustomReviews] = useState<Array<{ name: string; avatar: string; rating: number; date: string; comment: string; verified: boolean }>>([]);
  const [newReviewName, setNewReviewName] = useState<string>('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Inquiry states
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [inquirySubmitted, setInquirySubmitted] = useState<boolean>(false);

  // Auto scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const item = findVendorById(id || '');

  if (!item) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center space-y-4">
        <h3 className="font-serif text-2xl text-primary">Listing Not Found</h3>
        <p className="text-sm text-outline">The vendor profile you are trying to access does not exist or has been archived.</p>
        <button
          onClick={() => navigate('/explore')}
          className="px-6 py-2.5 bg-primary text-white rounded text-xs uppercase tracking-widest font-bold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const details = getVendorDetails(item);
  const mainImage = selectedGalleryImage || item.image;
  const currentReviews = [...details.reviews, ...customReviews];
  const isClaimed = item.claimed !== false;

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview = {
      name: newReviewName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      verified: true
    };

    setCustomReviews((prev) => [newReview, ...prev]);

    const newAct: ActivityLog = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `published a verified review for "${item.title}" with a ${newReviewRating}-star rating`,
      time: 'Just now',
      icon: 'rate_review',
    };
    setActivities((prev) => [newAct, ...prev]);

    setReviewSubmitted(true);
    setNewReviewName('');
    setNewReviewComment('');
    showToast('Review submitted successfully!');
  };

  const handleBookSlot = () => {
    if (!selectedTimeSlot) return;
    setBookingConfirmed(true);

    const dayName = details.availability[selectedDateIndex].day;
    const dateStr = details.availability[selectedDateIndex].date;
    
    const newAct: ActivityLog = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `secured a private planning slot with "${item.title}" on ${dayName}, ${dateStr} at ${selectedTimeSlot}`,
      time: 'Just now',
      icon: 'calendar_today',
    };
    setActivities((prev) => [newAct, ...prev]);
    showToast(`Secured slot: ${dayName} at ${selectedTimeSlot}`);
  };

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;

    setInquirySubmitted(true);
    
    const newAct: ActivityLog = {
      id: `act-${Date.now()}`,
      user: 'You',
      action: `submitted a bespoke consultation request to "${item.title}"`,
      time: 'Just now',
      icon: 'contact_mail',
    };
    setActivities((prev) => [newAct, ...prev]);
    showToast('Inquiry sent to partner liaison');
  };

  return (
    <div className="bg-refined-offwhite min-h-screen pb-20">
      
      {/* 1. Header Navigation and Title Hero */}
      <div className="bg-white border-b border-outline-variant/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-outline hover:text-primary transition-colors border-none bg-transparent cursor-pointer w-fit"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Listings
          </button>
          
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-outline">
            <span className="font-bold text-champagne-gold uppercase tracking-widest">{item.category}</span>
            <span>•</span>
            <span className="bg-champagne-gold/15 text-champagne-gold font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wide">
              {item.badge || 'Verified Partner'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Main 2-column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT COLUMN (GALLERY & SPECS & REVIEWS) ================= */}
          <div className="lg:col-span-8 space-y-8">

            {/* Image Gallery Swapping Widget — or unclaimed notice */}
            {isClaimed ? (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-4 shadow-xs space-y-4">
              <div className="h-96 md:h-[480px] rounded-xl overflow-hidden shadow-sm relative group bg-neutral-100">
                <img
                  src={mainImage}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <span className="absolute bottom-4 right-4 bg-midnight-slate/80 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-sm">
                  PORTFOLIO PREVIEW
                </span>
              </div>
              
              {/* Thumbnails Row */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={() => setSelectedGalleryImage(item.image)}
                  className={`h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer p-0 bg-transparent ${
                    mainImage === item.image ? 'border-champagne-gold ring-2 ring-champagne-gold/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.image} alt="Original Listing" className="w-full h-full object-cover" />
                </button>
                {details.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedGalleryImage(img)}
                    className={`h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer p-0 bg-transparent ${
                      mainImage === img ? 'border-champagne-gold ring-2 ring-champagne-gold/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            ) : (
            <div className="bg-neutral-800 rounded-2xl border border-neutral-700 p-8 md:p-12 shadow-xs flex flex-col items-center justify-center text-center min-h-[300px]">
              <AlertCircle className="w-12 h-12 text-champagne-gold/70 mb-4" />
              <p className="text-white font-bold text-lg uppercase tracking-widest mb-2">Instant Book Unavailable</p>
              <p className="text-neutral-400 text-sm leading-relaxed max-w-md">This listing has not been claimed by the vendor. Booking, consultations, and direct contact are not available.</p>
            </div>
            )}

            {/* Profile Overview Card */}
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 md:p-8 space-y-6 shadow-xs">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-outline">{item.subcategory || 'Luxury Listing'}</span>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary leading-tight mt-1">{item.title}</h1>
                  <p className="text-xs text-outline mt-2 flex items-center gap-1">
                    📍 {item.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-outline font-bold uppercase block tracking-wider">Starting at</span>
                  <span className="font-serif text-3xl font-bold text-champagne-gold block">${item.price.toLocaleString()}</span>
                </div>
              </div>

              <hr className="border-outline-variant/15" />

              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-primary">About this Experience</h3>
                <p className="text-midnight-slate/75 text-sm leading-relaxed whitespace-pre-line">
                  {item.description || "Planviry Preferred Partner listings guarantee strict quality metrics, premium client assistance, and direct reservation integration."}
                </p>
              </div>

              {/* Specs List — claimed vendors only */}
              {isClaimed && (
              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-outline">PARTNER SPECIFICATIONS</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {details.specs.map((spec, idx) => (
                    <div key={idx} className="p-4 bg-refined-offwhite rounded-xl border border-outline-variant/20 flex flex-col justify-between">
                      <span className="text-[9px] font-bold uppercase text-outline tracking-wider">{spec.label}</span>
                      <span className="text-xs font-bold text-primary mt-1.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {/* Dynamic Map view — claimed vendors only */}
              {isClaimed && (
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-outline flex items-center gap-1.5">
                  📍 AREA LOCATION MAP
                </h4>
                <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-neutral-100 h-72 relative">
                  <iframe
                    title={`Map of ${item.title}`}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(item.location + ' ' + item.title)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-none"
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
              )}
            </div>

            {/* Testimonials Block — claimed vendors only */}
            {isClaimed && (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 md:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-primary">Client Testimonials</h3>
                <div className="flex items-center gap-1 bg-champagne-gold/15 px-3 py-1 rounded-full text-champagne-gold">
                  <Star className="w-3.5 h-3.5 fill-champagne-gold" />
                  <span className="text-xs font-bold">{item.rating || 4.9} Verified</span>
                </div>
              </div>

              <div className="space-y-6 divide-y divide-outline-variant/15">
                {currentReviews.map((review, idx) => (
                  <div key={idx} className={`pt-6 ${idx === 0 ? 'pt-0' : ''} space-y-3`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20 shrink-0">
                          <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-primary">{review.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold text-champagne-gold">★ {review.rating.toFixed(1)}</span>
                            <span className="text-[9px] text-outline">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 uppercase tracking-widest">
                          VERIFIED CLIENT
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-midnight-slate/75 leading-relaxed pl-12 italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Review Input */}
              <div className="border-t border-outline-variant/15 pt-6">
                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-center text-xs font-bold uppercase tracking-wider">
                    ✓ Testimonial Published! Thank you for sharing your experience.
                  </div>
                ) : (
                  <form onSubmit={handlePostReview} className="bg-refined-offwhite rounded-xl border border-outline-variant/25 p-5 space-y-4">
                    <h4 className="font-serif text-sm font-bold text-primary">Post a Verified Client Review</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-outline">Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Alexander Cole"
                          value={newReviewName}
                          onChange={(e) => setNewReviewName(e.target.value)}
                          required
                          className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold uppercase text-outline">Star Score</label>
                        <select
                          value={newReviewRating}
                          onChange={(e) => setNewReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary"
                        >
                          <option value={5}>★ 5.0 - Exceptional</option>
                          <option value={4}>★ 4.0 - Premium Quality</option>
                          <option value={3}>★ 3.0 - Standard Service</option>
                          <option value={2}>★ 2.0 - Below Expectations</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-outline">Detailed Feedback</label>
                      <textarea
                        placeholder="Describe service quality, communications, and overall setup experience..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary min-h-[70px]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-primary hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-widest rounded transition-all border-none cursor-pointer"
                    >
                      Post Verified Review
                    </button>
                  </form>
                )}
              </div>
            </div>
            )}

          </div>

          {/* ================= RIGHT COLUMN (BOOKING & CONTACT DETAILS) ================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">

            {/* Unclaimed vendor notice */}
            {!isClaimed && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <h3 className="font-serif text-base font-bold text-amber-900">This vendor has not claimed their profile</h3>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Booking, consultations, and direct contact are unavailable for unclaimed listings. If you are the business owner, contact Planvry to claim this listing and unlock full profile features.
              </p>
              <button
                onClick={() => navigate('/legal')}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors border-none cursor-pointer"
              >
                Contact Planvry to Claim
              </button>
            </div>
            )}

            {/* Booking Slot Selection Widget — claimed vendors only */}
            {isClaimed && (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary">Secure Co-Planning Slot</h3>
                <p className="text-xs text-outline mt-1">Book an exclusive window with {item.title}’s events liaison.</p>
              </div>

              {bookingConfirmed ? (
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-xl text-center space-y-4 animate-in zoom-in-95 duration-250">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div>
                    <h4 className="font-serif font-bold text-emerald-950">Appointment Secured</h4>
                    <p className="text-xs text-emerald-800 mt-1">
                      Locked for <strong>{details.availability[selectedDateIndex].day}, {details.availability[selectedDateIndex].date} at {selectedTimeSlot}</strong>.
                    </p>
                  </div>
                  <p className="text-[9px] text-emerald-600 font-semibold bg-emerald-100/50 py-1.5 px-3 rounded-full w-fit mx-auto">
                    CALENDAR SYNCHRONIZED ✓
                  </p>
                  <button
                    onClick={() => setBookingConfirmed(false)}
                    className="text-xs font-bold text-primary hover:underline bg-transparent border-none cursor-pointer pt-1 block mx-auto"
                  >
                    Reschedule / Choose another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  
                  {/* Select Date */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline block">1. Select Target Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      {details.availability.map((avail, idx) => {
                        const isBooked = avail.status === 'Booked';
                        const isSelected = selectedDateIndex === idx;
                        return (
                          <button
                            key={idx}
                            disabled={isBooked}
                            onClick={() => {
                              setSelectedDateIndex(idx);
                              setSelectedTimeSlot('');
                            }}
                            className={`p-2.5 rounded-lg text-center border transition-all flex flex-col justify-center items-center h-20 cursor-pointer bg-white ${
                              isBooked
                                ? 'bg-neutral-50/50 border-neutral-100 opacity-40 cursor-not-allowed'
                                : isSelected
                                  ? 'border-champagne-gold bg-refined-offwhite ring-2 ring-champagne-gold/10'
                                  : 'border-outline-variant/40 hover:border-outline'
                            }`}
                          >
                            <span className="text-[9px] font-bold uppercase tracking-wider text-outline">{avail.day}</span>
                            <span className="font-serif text-lg font-bold text-primary mt-0.5">{avail.date}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Select Slot */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-outline block">
                      2. Choose Hour ({details.availability[selectedDateIndex].day}, {details.availability[selectedDateIndex].date})
                    </label>
                    
                    {details.availability[selectedDateIndex].slots.length === 0 ? (
                      <div className="p-3 bg-neutral-50 rounded-lg text-center text-xs text-outline border border-dashed">
                        ⚠️ No online slots remain. Message concierge to book.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {details.availability[selectedDateIndex].slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              selectedTimeSlot === slot
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white border-outline-variant/50 text-primary hover:border-outline'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    disabled={!selectedTimeSlot}
                    onClick={handleBookSlot}
                    className="w-full py-3 bg-primary hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-transform active:scale-98 shadow-sm border-none cursor-pointer mt-2"
                  >
                    {selectedTimeSlot ? `Book: ${selectedTimeSlot}` : 'Choose date & time to secure'}
                  </button>
                </div>
              )}
            </div>
            )}

            {/* Direct Consultation / Inquiry Form — claimed vendors only */}
            {isClaimed && (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-primary">Direct Consultation</h3>
                <p className="text-xs text-outline mt-1">Submit inquiries or coordinate customized specifications directly.</p>
              </div>

              {inquirySubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs font-medium leading-relaxed">
                  ✓ Consultation message sent! {item.title} Liaison will respond at your provided coordinates within 12 hours.
                </div>
              ) : (
                <form onSubmit={handleSendInquiry} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-outline">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Montgomery"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-outline">Your Email</label>
                    <input
                      type="email"
                      placeholder="e.g. elena@vance.com"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-outline">Consultation Message</label>
                    <textarea
                      placeholder="Describe custom setups, budget criteria, guest count, or logistics inquiries..."
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white border border-outline-variant/50 rounded text-xs outline-none focus:border-primary min-h-[90px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-[10px] uppercase tracking-widest font-bold rounded shadow-sm border-none cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Consultation Request
                  </button>
                </form>
              )}
            </div>
            )}

            {/* Direct Escrow Coordinates — claimed vendors only */}
            {isClaimed && (
            <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-xs space-y-4">
              <span className="text-[9px] font-bold text-outline uppercase tracking-wider block">DIRECT COORDINATES</span>
              
              <div className="space-y-3.5 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-champagne-gold" />
                  <div>
                    <span className="text-[9px] text-outline uppercase font-bold block">PHONE</span>
                    <span className="font-bold text-primary">{details.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-champagne-gold" />
                  <div>
                    <span className="text-[9px] text-outline uppercase font-bold block">EMAIL</span>
                    <span className="font-bold text-primary truncate block w-56">{details.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-champagne-gold" />
                  <div>
                    <span className="text-[9px] text-outline uppercase font-bold block">WEBSITE</span>
                    <span className="font-bold text-primary truncate block w-56">{details.website}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 text-champagne-gold" />
                  <div>
                    <span className="text-[9px] text-outline uppercase font-bold block">INSTAGRAM</span>
                    <span className="font-bold text-primary">{details.instagram}</span>
                  </div>
                </div>
              </div>
            </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
