// ✏️ EDIT THIS FILE to customise the whole website (name, phone, hostels, prices, photos).

export const SITE = {
  name: "Al-Salih Hostels",
  tagline: "Safe, clean and comfortable rooms. Pick your hostel, pick your room, move in.",
  // WhatsApp number: country code + number, digits only (no + or spaces)
  whatsapp: "923001234567",
  phoneDisplay: "+92 300 1234567",
  phoneTel: "+923001234567",
  email: "info@alsalihhostels.pk",
  city: "Rawalpindi",
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
    name: "Al-Salih Main Campus",
    area: "Saddar",
    address: "House 12, Street 4, Saddar, Rawalpindi",
    mapLink: "https://maps.google.com/?q=Saddar+Rawalpindi",
    audience: "Students & working professionals",
    blurb: "Our flagship hostel, a short walk from the main road, markets and public transport.",
    highlights: ["5 min to main road", "CCTV on every floor", "Home-style meals"],
    rooms: [
      { id: "m1", title: "Single Seater", beds: 1, price: 18000, image: "/images/main-single.jpg", features: ["Private room", "Attached bath", "Study desk", "AC / heater"] },
      { id: "m2", title: "Two Seater", beds: 2, price: 12000, image: "/images/main-double.jpg", popular: true, features: ["Shared with 1", "Attached bath", "Individual wardrobe", "Fan / heater"] },
      { id: "m3", title: "Three Bed Room", beds: 3, price: 9500, image: "/images/3seater.webp", features: ["Shared with 2", "Common bath", "Personal locker", "Study table"] },
      { id: "m4", title: "Four Bed Room", beds: 4, price: 7500, image: "/images/4seater.webp", features: ["Shared with 3", "Common bath", "Personal locker", "Budget friendly"] },
    ],
  },
  {
    id: "garden",
    name: "Al-Salih Garden Block",
    area: "Satellite Town",
    address: "Plot 45, Block B, Satellite Town, Rawalpindi",
    mapLink: "https://maps.google.com/?q=Satellite+Town+Rawalpindi",
    audience: "Students",
    blurb: "A quiet residential block with a lawn and a calm study environment.",
    highlights: ["Quiet neighbourhood", "Study lounge", "Backup power"],
    rooms: [
      { id: "g1", title: "Single Seater", beds: 1, price: 17000, image: "/images/garden-single.jpg", features: ["Private room", "Attached bath", "Study desk", "Heater"] },
      { id: "g2", title: "Two Seater", beds: 2, price: 11500, image: "/images/garden-double.jpg", popular: true, features: ["Shared with 1", "Attached bath", "Wardrobe", "Fan / heater"] },
      { id: "g3", title: "Three Bed Room", beds: 3, price: 9000, image: "/images/garden-triple.jpg", features: ["Shared with 2", "Common bath", "Locker", "Study table"] },
      { id: "g4", title: "Four Bed Room", beds: 4, price: 7000, image: "/images/garden-quad.jpg", features: ["Shared with 3", "Common bath", "Locker", "Budget friendly"] },
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
  { value: 120, suffix: "+", label: "Happy residents" },
  { value: 24, suffix: "/7", label: "Security" },
  { value: 4, suffix: "", label: "Room types" },
];

export const TESTIMONIALS = [
  { name: "Hamza R.", role: "University student", text: "Clean rooms, fast WiFi and the staff actually listen. I moved in the same week I messaged them." },
  { name: "Usman A.", role: "Software engineer", text: "Quiet at night, hot water in winter and food that feels like home. Great value for the price." },
  { name: "Bilal S.", role: "Medical student", text: "The study lounge saved me during exams. Feels safe, and my parents liked the security." },
];
