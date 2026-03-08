// Static data to replace database calls for static export

export const staticServices = [
  {
    id: '1',
    title: 'Air Freight',
    description: 'Fast and reliable air cargo services for urgent shipments worldwide.',
    icon: 'Plane',
    features: ['Express delivery', 'Real-time tracking', 'Global coverage', 'Secure handling'],
    pricing: 'From $50/kg',
  },
  {
    id: '2',
    title: 'Sea Freight',
    description: 'Cost-effective ocean freight for large volume shipments.',
    icon: 'Ship',
    features: ['Container shipping', 'LCL & FCL options', 'Port-to-port delivery', 'Customs clearance'],
    pricing: 'From $500/container',
  },
  {
    id: '3',
    title: 'Ground Transportation',
    description: 'Reliable road transport across West Africa and beyond.',
    icon: 'Truck',
    features: ['Door-to-door delivery', 'Regional coverage', 'Flexible scheduling', 'Live tracking'],
    pricing: 'From $2/km',
  },
  {
    id: '4',
    title: 'Customs Clearance',
    description: 'Expert customs brokerage and documentation services.',
    icon: 'FileText',
    features: ['Documentation handling', 'Duty calculation', 'Compliance assurance', 'Fast processing'],
    pricing: 'From $100/shipment',
  },
  {
    id: '5',
    title: 'Warehousing',
    description: 'Secure storage and distribution facilities.',
    icon: 'Package',
    features: ['Climate controlled', 'Inventory management', 'Pick & pack', '24/7 security'],
    pricing: 'From $5/m²/month',
  },
  {
    id: '6',
    title: 'Supply Chain Consulting',
    description: 'Strategic logistics consulting and optimization services.',
    icon: 'TrendingUp',
    features: ['Process optimization', 'Cost reduction', 'Risk management', 'Technology integration'],
    pricing: 'Custom pricing',
  },
]

export const staticTestimonials = [
  {
    id: '1',
    name: 'Fatou Ceesay',
    company: 'Gambia Trading Co.',
    role: 'Operations Manager',
    content: 'DCF Logistics has been our trusted partner for over 5 years. Their reliability and professionalism are unmatched.',
    rating: 5,
    image: '/images/testimonials/fatou.jpg',
  },
  {
    id: '2',
    name: 'Amadou Bah',
    company: 'West Africa Imports',
    role: 'CEO',
    content: 'Excellent service and competitive rates. They handle our shipments with care and always deliver on time.',
    rating: 5,
    image: '/images/testimonials/amadou.jpg',
  },
  {
    id: '3',
    name: 'Mariama Jallow',
    company: 'Senegal Exports Ltd',
    role: 'Logistics Director',
    content: 'Professional team with deep knowledge of West African logistics. Highly recommended!',
    rating: 5,
    image: '/images/testimonials/mariama.jpg',
  },
]

export const staticStats = {
  yearsOfExperience: 15,
  annualShipments: 50000,
  customerSatisfactionRate: 99.2,
  globalReach: 'Africa and worldwide',
  foundedYear: 2008,
  headquarters: 'IC PLAZA Cooperative Junction Westfield Serekunda, The Gambia',
  totalCustomers: 2500,
  countriesServed: 45,
  warehouseSpace: '50,000 m²',
  fleetSize: 150,
}

export const staticTeam = [
  {
    id: '1',
    name: 'Ousman Jatta',
    role: 'Chief Executive Officer',
    bio: 'Over 20 years of experience in West African logistics and trade.',
    image: '/images/team/ousman.jpg',
    email: 'ousman@dcflogistics.gm',
    linkedin: 'https://linkedin.com/in/ousman-jatta',
  },
  {
    id: '2',
    name: 'Aisha Camara',
    role: 'Operations Director',
    bio: 'Expert in supply chain optimization and customs procedures.',
    image: '/images/team/aisha.jpg',
    email: 'aisha@dcflogistics.gm',
    linkedin: 'https://linkedin.com/in/aisha-camara',
  },
  {
    id: '3',
    name: 'Lamin Touray',
    role: 'Customer Relations Manager',
    bio: 'Dedicated to ensuring exceptional customer service and satisfaction.',
    image: '/images/team/lamin.jpg',
    email: 'lamin@dcflogistics.gm',
    linkedin: 'https://linkedin.com/in/lamin-touray',
  },
]

export const staticFAQs = [
  {
    id: '1',
    question: 'What shipping methods do you offer?',
    answer: 'We offer air freight, sea freight, and ground transportation services to meet all your shipping needs.',
  },
  {
    id: '2',
    question: 'How can I track my shipment?',
    answer: 'You can track your shipment using our online tracking system with your tracking number, or contact our customer service team.',
  },
  {
    id: '3',
    question: 'Do you handle customs clearance?',
    answer: 'Yes, we provide comprehensive customs clearance services including documentation, duty calculation, and compliance assurance.',
  },
  {
    id: '4',
    question: 'What are your operating hours?',
    answer: 'Our customer service is available 24/7, and our warehouses operate Monday to Saturday, 8 AM to 6 PM GMT.',
  },
  {
    id: '5',
    question: 'Do you offer insurance for shipments?',
    answer: 'Yes, we offer comprehensive insurance coverage for all types of shipments to protect your valuable cargo.',
  },
]

export const staticLocations = [
  {
    id: '1',
    name: 'Serekunda Headquarters',
    address: 'IC PLAZA Cooperative Junction Westfield Serekunda, The Gambia',
    phone: '+220 395 1020',
    email: 'info@dcfagency.com',
    coordinates: { lat: 13.4549, lng: -16.5790 },
    type: 'headquarters',
  },
  {
    id: '2',
    name: 'Dakar Office',
    address: '456 Route de l\'Aéroport, Dakar, Senegal',
    phone: '+221 33 123 4567',
    email: 'dakar@dcflogistics.gm',
    coordinates: { lat: 14.6928, lng: -17.4467 },
    type: 'branch',
  },
  {
    id: '3',
    name: 'Freetown Branch',
    address: '789 Siaka Stevens Street, Freetown, Sierra Leone',
    phone: '+232 22 123 456',
    email: 'freetown@dcflogistics.gm',
    coordinates: { lat: 8.4657, lng: -13.2317 },
    type: 'branch',
  },
]

// Mock functions to replace tRPC calls
export const getServices = () => Promise.resolve(staticServices)
export const getTestimonials = () => Promise.resolve(staticTestimonials)
export const getStats = () => Promise.resolve(staticStats)
export const getTeam = () => Promise.resolve(staticTeam)
export const getFAQs = () => Promise.resolve(staticFAQs)
export const getLocations = () => Promise.resolve(staticLocations)

// Contact form handler (static version)
export const submitContactForm = async (data: any) => {
  // For static export, we'll use mailto or external service
  const subject = encodeURIComponent(`Contact Form: ${data.subject || 'General Inquiry'}`)
  const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Message: ${data.message}
  `)
  
  const mailtoLink = `mailto:info@dcfagency.com?subject=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
  
  return { success: true, message: 'Email client opened. Please send the email to complete your inquiry.' }
}

// Quote request handler (static version)
export const submitQuoteRequest = async (data: any) => {
  const subject = encodeURIComponent('Quote Request from Website')
  const body = encodeURIComponent(`
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company || 'Not provided'}
Service Type: ${data.serviceType}
Origin: ${data.origin}
Destination: ${data.destination}
Weight: ${data.weight}
Dimensions: ${data.dimensions || 'Not provided'}
Description: ${data.description || 'Not provided'}
  `)
  
  const mailtoLink = `mailto:info@dcfagency.com?subject=${subject}&body=${body}`
  window.open(mailtoLink, '_blank')
  
  return { success: true, message: 'Email client opened. Please send the email to receive your quote.' }
}
