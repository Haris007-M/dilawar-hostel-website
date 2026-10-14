// ✏️ EDIT THIS FILE to customise the whole website (name, phone, hostels, prices, photos).

export const SITE = {
  name: "Al-Salih Hostels",
  tagline: "Safe, clean and comfortable rooms. Pick your hostel, pick your room, move in.",
  // WhatsApp number: country code + number, digits only (no + or spaces)
  whatsapp: "923190973966",
  phoneDisplay: "+92 319 0973966",
  phoneTel: "+923190973966",
  email: "",
  city: "Islamabad",
  currency: "PKR",
};

export type RoomType = {
  id: string;
  title: string;
  beds: number;
  price: number; // per bed, per month
  image: string; // put the photo in /public/images and use the path here
  features: string[];
  popular?: boolean;
  gallery?: string[]; // extra photos shown in the room popup
};

export type Hostel = {
  id: string;
  name: string;
  area: string;
  address: string;
  mapLink: string;
  audience: string;
  blurb: string;
  highlights: string[];
  rooms: RoomType[];
};

export const HOSTELS: Hostel[] = [
  {
    id: "main",
    name: "Al Salih Boys Hostel",
    area: "H-13",
    address: "Sector H-13, near Zubair Shah Road (Markaz Road), Islamabad",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=JXRH%2BV9M%2C+H-13%2C+Islamabad",
    audience: "Students & young professionals",
    blurb: "A newly renovated hostel in H-13 close to NUST (Gate 2). Rated 5.0 on Google for its clean rooms, well-managed mess and helpful management.",
    highlights: ["Near NUST Gate 2", "Newly renovated", "Well-managed mess", "Internet included"],
    rooms: [
      { id: "m1", title: "Single Seater", beds: 1, price: 24000, image: "/images/main-single.jpg", features: ["Private room", "Attached bath", "Study desk", "AC / heater"] },
      { id: "m2", title: "Two Seater", beds: 2, price: 22000, image: "/images/2seater.jpeg", popular: true, features: ["Shared with 1", "Attached bath", "Individual wardrobe", "Fan / heater"] },
      { id: "m3", title: "Three Bed Room", beds: 3, price: 20000, image: "/images/3seater.webp", features: ["Shared with 2", "Common bath", "Personal locker", "Study table"] },
      { id: "m4", title: "Four Bed Room", beds: 4, price: 18000, image: "/images/4seater.webp", features: ["Shared with 3", "Common bath", "Personal locker", "Budget friendly"] },
    ],
  },
  {
    id: "garden",
    name: "Al Salih Hostel 2",
    area: "Islamabad",
    address: "Address to be added (edit in lib/data.ts)",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Al+Salih+Boys+Hostel+H-13+Islamabad",
    audience: "Students & young professionals",
    blurb: "Our second hostel with the same standards of cleanliness, food and management.",
    highlights: ["Clean rooms", "Mess available", "Helpful management"],
    rooms: [
      { id: "g1", title: "Single Seater", beds: 1, price: 24000, image: "/images/garden-single.jpg", features: ["Private room", "Attached bath", "Study desk", "Heater"] },
      { id: "g2", title: "Two Seater", beds: 2, price: 22000, image: "/images/2seater.jpeg", popular: true, features: ["Shared with 1", "Attached bath", "Wardrobe", "Fan / heater"] },
      { id: "g3", title: "Three Bed Room", beds: 3, price: 20000, image: "/images/3seater.webp", features: ["Shared with 2", "Common bath", "Locker", "Study table"] },
      { id: "g4", title: "Four Bed Room", beds: 4, price: 18000, image: "/images/4seater.webp", features: ["Shared with 3", "Common bath", "Locker", "Budget friendly"] },
    ],
  },
];

export const AMENITIES = [
  { icon: "wifi", title: "High-speed WiFi", text: "Fast internet in every room for classes, work and streaming." },
  { icon: "utensils", title: "Home-style meals", text: "Breakfast, lunch and dinner. Hygienic kitchen, rotating menu." },
  { icon: "shield", title: "24/7 security", text: "CCTV cameras, guards and a visitor log keep everyone safe." },
  { icon: "zap", title: "Backup power", text: "Generator or UPS backup, so load-shedding never stops you." },
  { icon: "droplets", title: "Hot water", text: "Geyser hot water in winter and filtered drinking water all year." },
  { icon: "shirt", title: "Laundry", text: "Washing machines and a drying area. Pickup service available." },
  { icon: "book", title: "Study areas", text: "Quiet lounges and reading hours so exam time is easier." },
  { icon: "sparkles", title: "Daily cleaning", text: "Rooms, corridors and bathrooms cleaned every day." },
];

export const STEPS = [
  { title: "Message us", text: "Tell us the hostel and room type you like on WhatsApp." },
  { title: "Visit or video call", text: "Come see the rooms, or ask for a video tour if you are out of town." },
  { title: "Confirm your bed", text: "Pay the security deposit and first month's rent to reserve it." },
  { title: "Move in", text: "Bring your bags. Bedding, cupboard and keys are ready." },
];

export const FAQS = [
  { q: "What is included in the monthly rent?", a: "Rent covers your bed, electricity, water, WiFi and daily cleaning. Meals can be added as a separate monthly plan." },
  { q: "Is there a security deposit?", a: "Yes. A refundable security deposit is taken at joining and returned when you leave, after room checks." },
  { q: "Are visitors allowed?", a: "Family visitors are welcome in the common area during visiting hours. Every visitor is logged at reception." },
  { q: "Can I switch rooms later?", a: "Yes, if a bed is free in the room type you want. Ask the hostel manager." },
  { q: "How do I book?", a: "Message us on WhatsApp or call. We will confirm availability and send you the joining details." },
];

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const fmt = (n: number) => `${SITE.currency} ${n.toLocaleString("en-PK")}`;

export const STATS = [
  { value: 2, suffix: "", label: "Hostels" },
  { value: 4, suffix: "", label: "Room types" },
  { value: 5, suffix: ".0 ★", label: "Google rating" },
];

// Themes taken from Google Maps reviews. Replace with exact reviews (with permission) when you have them.
export const TESTIMONIALS = [
  { name: "Google review", role: "Resident, H-13", text: "The mess is well managed and the food is consistent. Meals are on time and the kitchen is kept clean." },
  { name: "Google review", role: "Resident, H-13", text: "Rooms are clean and the hostel is newly renovated. Very close to NUST, so the commute is short." },
  { name: "Google review", role: "Resident, H-13", text: "The owner and staff are helpful and respond quickly when something needs fixing." },
];
