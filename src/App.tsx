import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, Phone, MessageCircle, Star, Clock, Award, 
  ChevronRight, PlayCircle, CheckCircle2, Scissors, 
  Sparkles, BookOpen, Users, Map, X, ArrowLeft,
  Droplets, Heart, Smile, Palette, Calendar, Mail, Instagram
} from 'lucide-react';

// --- DATA ---
const REVIEWS = [
  {
    id: 1,
    name: "Sayantika Das",
    time: "3 weeks ago",
    rating: 5,
    text: "One of the best option... just wow... within budget, awesome service, staffs behaviour is also very very good... must recommend .. go grab all offer.. From 2021 I don't have other choice.... Riv salon is best in Town"
  },
  {
    id: 2,
    name: "Sohani Paul",
    time: "6 months ago",
    rating: 5,
    text: "I heard about this salon since long but this time I experienced the service by myself and it's truly amazing. The owner and the co-workers are professionals and experts at their field. They take good care for their individual customers..."
  },
  {
    id: 3,
    name: "Pragati Chakraborty",
    time: "2 months ago",
    rating: 5,
    text: "Very polite behaviour and nice work. Have multiple brand options for products. Really very happy and satisfied😊 ✨"
  }
];

const COURSES = [
  {
    id: 'hair-styling',
    title: "Professional Hair Styling",
    duration: "3 Months",
    level: "Beginner to Advanced",
    icon: <Scissors className="w-6 h-6" />,
    description: "Master the art of hair cutting, coloring, and advanced styling techniques.",
    previewVideo: "https://videos.pexels.com/video-files/3997933/3997933-uhd_2560_1440_24fps.mp4",
    interactiveType: "quiz",
    interactiveData: {
      question: "Which cutting technique creates the most texture?",
      options: ["Blunt Cut", "Point Cutting", "Slide Cutting"],
      answer: "Point Cutting"
    }
  },
  {
    id: 'bridal-makeup',
    title: "Bridal Makeup Artistry",
    duration: "2 Months",
    level: "Intermediate",
    icon: <Sparkles className="w-6 h-6" />,
    description: "Learn flawless airbrushing, traditional bridal looks, and HD makeup.",
    previewVideo: "https://videos.pexels.com/video-files/4625516/4625516-uhd_2560_1440_24fps.mp4",
    interactiveType: "palette",
    interactiveData: {
      title: "Select a warm bridal palette",
      colors: ["#FCD34D", "#F87171", "#D97706", "#991B1B"]
    }
  },
  {
    id: 'skin-facial',
    title: "Skin & Facial Specialist",
    duration: "6 Weeks",
    level: "Beginner",
    icon: <CheckCircle2 className="w-6 h-6" />,
    description: "Deep dive into dermatology basics, advanced facials, and skin treatments.",
    previewVideo: "https://videos.pexels.com/video-files/3997933/3997933-uhd_2560_1440_24fps.mp4",
    interactiveType: "quiz",
    interactiveData: {
      question: "Which ingredient is best for hydration?",
      options: ["Salicylic Acid", "Hyaluronic Acid", "Retinol"],
      answer: "Hyaluronic Acid"
    }
  }
];

const SERVICES = [
  {
    id: 'haircut',
    title: 'Hair Styling & Cutting',
    desc: 'Expert cuts, blowouts, and styling for all hair types.',
    price: 'Starts at ₹299',
    icon: <Scissors className="w-6 h-6" />
  },
  {
    id: 'color',
    title: 'Hair Coloring',
    desc: 'Balayage, highlights, and root touch-ups with premium products.',
    price: 'Starts at ₹999',
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: 'makeup',
    title: 'Bridal & Party Makeup',
    desc: 'Flawless HD and airbrush makeup for your special days.',
    price: 'Starts at ₹4,999',
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    id: 'facial',
    title: 'Skin Care & Facials',
    desc: 'Rejuvenating facials, cleanups, and advanced skin treatments.',
    price: 'Starts at ₹599',
    icon: <Smile className="w-6 h-6" />
  },
  {
    id: 'spa',
    title: 'Hair & Body Spa',
    desc: 'Relaxing massages and deep conditioning hair spa treatments.',
    price: 'Starts at ₹799',
    icon: <Droplets className="w-6 h-6" />
  },
  {
    id: 'nails',
    title: 'Nail Art & Extensions',
    desc: 'Acrylics, gel polish, and creative nail art designs.',
    price: 'Starts at ₹499',
    icon: <Heart className="w-6 h-6" />
  }
];

// --- COMPONENTS ---

const InteractivePreview = ({ course, onClose }: { course: any, onClose: () => void }) => {
  const [quizState, setQuizState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl overflow-y-auto overflow-x-hidden w-full max-w-2xl shadow-2xl relative max-h-[95vh]"
      >
        <button onClick={onClose} className="absolute top-4 left-4 z-10 px-4 py-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-black/70 transition">
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative aspect-video bg-stone-900 shrink-0">
          <video 
            src={course.previewVideo} 
            className="w-full h-full object-cover opacity-80"
            autoPlay muted loop playsInline
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <PlayCircle className="w-16 h-16 text-white/80 mx-auto mb-2" />
              <p className="text-white font-medium tracking-widest uppercase text-sm">Course Preview</p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-stone-50">
          <h3 className="text-2xl font-serif font-medium text-stone-900 mb-2">{course.title}</h3>
          <p className="text-stone-600 mb-6">Try a quick interactive exercise from this course:</p>

          {course.interactiveType === 'quiz' && (
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <p className="font-medium text-stone-800 mb-4">{course.interactiveData.question}</p>
              <div className="space-y-2">
                {course.interactiveData.options.map((opt: string) => (
                  <button
                    key={opt}
                    onClick={() => setQuizState(opt === course.interactiveData.answer ? 'correct' : 'incorrect')}
                    className="w-full text-left px-4 py-3 rounded-lg border border-stone-200 hover:border-amber-600 hover:bg-amber-50 transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {quizState === 'correct' && <p className="mt-4 text-emerald-600 font-medium flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Correct! Great job.</p>}
              {quizState === 'incorrect' && <p className="mt-4 text-red-500 font-medium">Not quite, try again!</p>}
            </div>
          )}

          {course.interactiveType === 'palette' && (
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <p className="font-medium text-stone-800 mb-4">{course.interactiveData.title}</p>
              <div className="flex gap-4">
                {course.interactiveData.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full shadow-inner transition-transform ${selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-stone-800' : 'hover:scale-105'}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {selectedColor && <p className="mt-4 text-stone-600 text-sm">Beautiful choice for a warm undertone.</p>}
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-stone-200">
            <button 
              onClick={onClose} 
              className="w-full py-3 rounded-xl bg-stone-200 text-stone-800 font-medium hover:bg-stone-300 transition flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Courses
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-200">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-stone-900 rounded-full flex items-center justify-center">
              <span className="text-amber-500 font-serif font-bold text-xl">R</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl leading-tight">Riv Salon</h1>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">& Academy</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-amber-600 transition">About</a>
            <a href="#services" className="hover:text-amber-600 transition">Services</a>
            <a href="#courses" className="hover:text-amber-600 transition">Courses</a>
            <a href="#reviews" className="hover:text-amber-600 transition">Reviews</a>
            <a href="#contact" className="hover:text-amber-600 transition">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/riv_salon_and_academy_?igsh=MWpuMHc4cDhqamw3dQ==" target="_blank" rel="noreferrer" className="text-stone-600 hover:text-pink-600 transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#contact" className="bg-stone-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-stone-800 transition shadow-lg shadow-stone-900/20">
              Enroll Now
            </a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop" 
            alt="Salon Training" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/95 to-stone-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-8"
          >
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>5.0 Rated Beauty Academy in Khardaha</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-medium text-stone-900 tracking-tight mb-6 max-w-4xl mx-auto"
          >
            Become a Certified <br/><span className="italic text-amber-700">Beauty Professional</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto"
          >
            Join Riv Salon & Academy. Master hair, beauty, and grooming skills with industry experts and hands-on practical training.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#courses" className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition shadow-xl shadow-stone-900/20 flex items-center justify-center gap-2">
              View Courses <ChevronRight className="w-4 h-4" />
            </a>
            <a href="https://wa.me/9108017772294" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-white text-stone-900 border border-stone-200 rounded-full font-medium hover:bg-stone-50 transition flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-600" /> WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2669&auto=format&fit=crop" 
                  alt="Student practicing" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-amber-50 p-8 rounded-3xl border border-amber-100 shadow-xl hidden md:block">
                <div className="text-4xl font-serif font-medium text-amber-700 mb-2">5.0</div>
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
                </div>
                <p className="text-sm font-medium text-stone-800">Highly Rated by Students</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-amber-600 mb-3">About The Academy</h2>
              <h3 className="text-4xl font-serif font-medium text-stone-900 mb-6">Excellence in Beauty Education</h3>
              <p className="text-stone-600 mb-6 text-lg">
                Located in the heart of Khardaha, Riv Salon and Academy is a premier destination for aspiring beauty professionals. Led by industry expert Rishav, we provide world-class training in a modern, fully-equipped salon environment.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Hands-on Practical Training",
                  "Small Batch Sizes for Personal Attention",
                  "Industry-Recognized Certification",
                  "Job Placement Assistance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-stone-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES --- */}
      <section id="services" className="py-24 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-600 mb-3">Salon Services</h2>
            <h3 className="text-4xl font-serif font-medium text-stone-900">Premium Beauty Treatments</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(service => (
              <div key={service.id} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 hover:shadow-md transition group flex flex-col">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-serif font-medium text-stone-900 mb-3">{service.title}</h4>
                <p className="text-stone-600 mb-6 flex-grow">{service.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-100">
                  <span className="font-medium text-stone-900">{service.price}</span>
                  <a href="#contact" className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1">
                    Book Now <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COURSES --- */}
      <section id="courses" className="py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-500 mb-3">Our Programs</h2>
            <h3 className="text-4xl font-serif font-medium mb-6">Professional Certification Courses</h3>
            <p className="text-stone-400 text-lg">Interactive training designed to make you industry-ready from day one. Click 'Preview Course' to try a sample lesson.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <div key={course.id} className="bg-stone-800 rounded-3xl p-8 border border-stone-700 hover:border-amber-500/50 transition group">
                <div className="w-14 h-14 bg-stone-700 rounded-2xl flex items-center justify-center mb-6 text-amber-400 group-hover:scale-110 transition-transform">
                  {course.icon}
                </div>
                <h4 className="text-2xl font-serif font-medium mb-3">{course.title}</h4>
                <p className="text-stone-400 mb-6 line-clamp-2">{course.description}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-stone-300">
                    <Clock className="w-4 h-4 text-stone-500" /> {course.duration}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-300">
                    <Award className="w-4 h-4 text-stone-500" /> {course.level}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setActivePreview(course.id)}
                    className="w-full py-3 rounded-xl bg-stone-700 text-white font-medium hover:bg-stone-600 transition flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" /> Preview Course
                  </button>
                  <a href="#contact" className="w-full py-3 rounded-xl bg-amber-600 text-white font-medium hover:bg-amber-500 transition text-center">
                    Enroll Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="reviews" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest uppercase text-amber-600 mb-3">Student Success</h2>
            <h3 className="text-4xl font-serif font-medium text-stone-900">What Our Clients & Students Say</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-stone-600 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="font-medium text-stone-900">{review.name}</div>
                  <div className="text-xs text-stone-400">{review.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & LOCATION --- */}
      <section id="contact" className="py-24 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-serif font-medium text-stone-900 mb-6">Start Your Journey Today</h2>
              <p className="text-stone-600 mb-10 text-lg">
                Ready to turn your passion for beauty into a successful career? Visit our academy or contact us to book a free counseling session.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Visit Us</h4>
                    <p className="text-stone-600">Regent Park, A 26, Rahara Bazar, Kalyan Nagar, Rahara, Khardaha, West Bengal 700118</p>
                    <p className="text-sm text-stone-500 mt-1">Open · Closes 10 pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Call Us</h4>
                    <p className="text-stone-600">080177 72294</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex gap-4">
                <a href="https://wa.me/9108017772294" target="_blank" rel="noreferrer" className="px-8 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl shadow-stone-200/50">
              <h3 className="text-2xl font-serif font-medium text-stone-900 mb-6">Book an Appointment</h3>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const phone = formData.get('phone');
                  const service = formData.get('service');
                  const date = formData.get('date');
                  const message = formData.get('message');
                  
                  const subject = encodeURIComponent(`New Appointment Request from ${name}`);
                  const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nMessage: ${message}`);
                  
                  window.location.href = `mailto:rinagupta0709@gmail.com?subject=${subject}&body=${body}`;
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" placeholder="Your name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" placeholder="Your phone" />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-stone-700 mb-1">Preferred Date</label>
                    <input type="date" id="date" name="date" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition" />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-stone-700 mb-1">Service Required</label>
                  <select id="service" name="service" required className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white">
                    <option value="">Select a service...</option>
                    <option value="Haircut & Styling">Haircut & Styling</option>
                    <option value="Hair Coloring">Hair Coloring</option>
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Facial & Skin Care">Facial & Skin Care</option>
                    <option value="Academy Course Inquiry">Academy Course Inquiry</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1">Additional Notes</label>
                  <textarea id="message" name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none" placeholder="Any special requests?"></textarea>
                </div>
                <button type="submit" className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800 transition flex items-center justify-center gap-2 mt-2">
                  <Calendar className="w-5 h-5" /> Request Appointment
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 bg-stone-100 rounded-3xl overflow-hidden h-[300px] relative border border-stone-200 flex items-center justify-center">
            {/* Placeholder for Google Map - In a real app, use an iframe or Google Maps API */}
            <div className="text-center p-8">
              <Map className="w-12 h-12 text-stone-400 mx-auto mb-4" />
              <h3 className="font-medium text-stone-900 mb-2">Interactive Map</h3>
              <p className="text-stone-500 text-sm mb-4">P9CQ+PH Khardaha, West Bengal</p>
              <a 
                href="https://maps.google.com/?q=Riv+Salon+and+Academy+Khardaha" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-amber-600 font-medium hover:text-amber-700"
              >
                Open in Google Maps <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-800 rounded-full flex items-center justify-center">
              <span className="text-amber-500 font-serif font-bold">R</span>
            </div>
            <span className="font-serif font-medium text-white">Riv Salon & Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/riv_salon_and_academy_?igsh=MWpuMHc4cDhqamw3dQ==" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-pink-500 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Riv Salon and Academy. All rights reserved.</p>
        </div>
      </footer>

      {/* --- FLOATING INSTA --- */}
      <a 
        href="https://www.instagram.com/riv_salon_and_academy_?igsh=MWpuMHc4cDhqamw3dQ==" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      >
        <Instagram className="w-6 h-6" />
      </a>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {activePreview && (
          <InteractivePreview 
            course={COURSES.find(c => c.id === activePreview)} 
            onClose={() => setActivePreview(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
