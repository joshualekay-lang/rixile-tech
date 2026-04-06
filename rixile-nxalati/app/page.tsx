'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone, Mail, Award, Truck, Droplet, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function RixileNxalatiLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form State
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(event.currentTarget);
    
    // HER NEW WEB3FORMS ACCESS KEY IS ACTIVATED HERE:
    formData.append("access_key", "c2dea389-226c-4ff5-8834-9695d8015f94");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        event.currentTarget.reset(); // Clear the form
        setTimeout(() => setFormStatus('idle'), 5000); // Reset status after 5 seconds
      } else {
        console.error("Form Error:", data);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-200">
      
      {/* 1. The Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-purple-950 flex flex-col items-center justify-center text-white"
          >
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tighter"
              >
                Rixile Nxalati.
              </motion.h1>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-[3px] bg-gradient-to-r from-purple-400 via-white to-orange-400 mt-8 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-purple-100 py-3 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          
          <a href="#" className="flex items-center gap-2">
            <img src="/logo.png" alt="Rixile Nxalati Logo" className="h-12 md:h-14 object-contain" />
          </a>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-purple-950">
            {['Overview', 'Divisions', 'Reach', 'Clients'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="relative group overflow-hidden">
                {item}
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-purple-600 transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </a>
            ))}
            <a href="#contact">
              <Button variant="default" className="bg-purple-900 text-white hover:bg-purple-800 rounded-full px-8 py-5 shadow-md shadow-purple-900/20">
                Contact
              </Button>
            </a>
          </div>

          <button className="md:hidden text-purple-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-24 md:pt-48 md:pb-32 px-6 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-xl">
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-purple-950">
                On-Site Diesel.<br />
                <span className="text-orange-500">On the Go.</span><br />
                On Schedule.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate-700 mb-10 leading-relaxed font-medium">
                An independent reseller of bulk petroleum products, specialising in quality cross-industry fuel supply and fuel management solutions.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <a href="#divisions">
                  <Button className="bg-purple-900 text-white hover:bg-purple-800 rounded-full px-8 py-6 text-base font-bold shadow-lg shadow-purple-900/30">
                    Our Divisions
                  </Button>
                </a>
                <a href="#overview">
                  <Button variant="outline" className="rounded-full px-8 py-6 text-base font-bold border-purple-200 text-purple-900 hover:bg-purple-50">
                    Company Overview
                  </Button>
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1.5 }}
              className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 shadow-2xl shadow-purple-900/10 border-4 border-white"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-transparent z-10" />
              <img src="/hero.jpg" alt="Fuel Logistics Truck at Sunset" className="object-cover w-full h-full" />
            </motion.div>
          </div>
        </section>

        {/* Overview & Mission */}
        <section className="py-24 bg-white px-6" id="overview">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h2 className="text-sm font-bold tracking-widest uppercase text-purple-600 mb-4">Vision & Mission</h2>
              <p className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-6 text-purple-950">
                To become a pre-eminent bulk fuel supplier in South Africa and beyond.
              </p>
              <p className="text-lg text-slate-600 font-medium mb-8">
                We are passionate about innovative services, processes, and technologies that enable our clients to achieve optimal fuel efficiency. Our mission is to create unprecedented value for our clients, shareholders, and employees.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
                <Award className="w-10 h-10 mb-4 text-purple-700" />
                <h3 className="text-3xl font-extrabold mb-2 text-purple-950">Level 1</h3>
                <p className="text-sm text-purple-800 font-bold">B-BBEE Contributor</p>
                <p className="text-xs text-purple-600/80 mt-2 font-medium">100% black woman-owned, managed and controlled.</p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-purple-50 p-8 rounded-2xl border border-purple-100 mt-8">
                <MapPin className="w-10 h-10 mb-4 text-purple-700" />
                <h3 className="text-3xl font-extrabold mb-2 text-purple-950">3+ Years</h3>
                <p className="text-sm text-purple-800 font-bold">Industry Excellence</p>
                <p className="text-xs text-purple-600/80 mt-2 font-medium">Established in 2022, offering exceptional fuel solutions.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Service Divisions & Products */}
        <section className="py-32 px-6 bg-slate-50 border-y border-slate-100" id="divisions">
          <div className="max-w-[1200px] mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-purple-950">Versatility to meet unexpected market demand.</h2>
              <p className="text-lg text-slate-700 font-medium">We address the needs of major oil and petroleum industry players through robust supply capabilities and efficient logistics.</p>
            </motion.div>

            {/* Divisions Grid with Images */}
            <div className="grid md:grid-cols-2 gap-8 mb-24">
              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-500 flex flex-col"
              >
                <div className="w-full h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-purple-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src="/petroleum.jpg" alt="Petroleum Supply" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-10 flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-purple-950 flex items-center gap-3">
                    <Droplet className="w-6 h-6 text-purple-600" /> Petroleum Supply
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Independent reseller of fuel with supply capabilities across South Africa through supply agreements with major oil companies. Wholesale petroleum products supplied and delivered straight to your premises.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="group overflow-hidden rounded-3xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-500 flex flex-col"
              >
                <div className="w-full h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-purple-900/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img src="/logistics.jpg" alt="Logistics Transport" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-10 flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-purple-950 flex items-center gap-3">
                    <Truck className="w-6 h-6 text-purple-600" /> Logistics & Transport
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Geared to go. Planning and executing the efficient transportation and storage of goods from origin to consumption. Modern, competitively priced fuel transportation service and other related petroleum products.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Petroleum Products Grid */}
            <h3 className="text-2xl font-extrabold mb-8 text-center text-purple-950">Our Bulk Petroleum Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Diesel', 'Petrol', 'Paraffin', 'Heavy Fuel Oil (HFO)', 'LPG', 'Gases & Gas Mixtures', 'Jet Fuel / Aviation Gas', 'Bitumen'].map((chemical) => (
                <div key={chemical} className="p-6 border-2 border-slate-100 rounded-xl bg-white hover:border-purple-400 hover:text-purple-700 transition-all text-center font-bold flex items-center justify-center min-h-[100px] text-slate-700 shadow-sm">
                  {chemical}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operations Gallery Section - 4 Columns */}
        <section className="py-24 bg-white px-6">
          <div className="max-w-[1200px] mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-purple-950">Operations in Action</h2>
              <p className="text-lg text-slate-600 font-medium mt-4">Powering industries and retail networks across the country.</p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <motion.div variants={fadeUp} className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative group">
                <img src="/station1.jpg" alt="Gas Station Night" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg leading-tight">Retail Distribution</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative group">
                <img src="/station2.jpg" alt="Winter Logistics" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg leading-tight">All-Weather Reliability</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative group">
                <img src="/car.jpg" alt="Fuel Pumping Car" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg leading-tight">Consumer Servicing</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden relative group">
                <img src="/generator.jpg" alt="Fuel Pumping Generator" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-bold text-lg leading-tight">On-Site Logistics</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Reach & Clients Section */}
        <section className="py-32 bg-purple-950 text-white px-6 relative overflow-hidden" id="reach">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-800/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 relative z-10">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8">Our Reach</h2>
              <p className="text-xl text-purple-100 mb-8 leading-relaxed font-medium">
                Our passion for petroleum knows no boundaries. With headquarters in Gauteng, we provide fuel optimisation solutions for clients in all 9 provinces of South Africa and beyond.
              </p>
              <div className="aspect-video rounded-2xl overflow-hidden bg-purple-900 border border-purple-800 shadow-2xl">
                 <img src="/reach.jpg" alt="Fuel Transport Logistics Reach" className="w-full h-full object-cover opacity-90" />
              </div>
            </motion.div>

            <motion.div id="clients" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-12">Our Clients</h2>
              <div className="space-y-6">
                {[
                  { name: "Thames Liquid and Gas Logistics Pty. Ltd", services: "Petroleum • Logistics" },
                  { name: "Ensemble Project Solutions for DTIC", services: "Petroleum • Logistics" },
                  { name: "SANDF Bloemfontein", services: "Petroleum • Logistics" }
                ].map((client, i) => (
                  <motion.div key={i} variants={fadeUp} className="p-8 border border-purple-800/50 rounded-2xl bg-purple-900/40 hover:bg-purple-800/60 transition-colors backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-2 text-white">{client.name}</h3>
                    <p className="text-purple-300 font-bold text-sm uppercase tracking-wider">{client.services}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* Contact Form */}
        <section className="py-32 px-6 bg-white" id="contact">
          <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-purple-950">Get in touch</h2>
              <p className="text-lg text-slate-600 mb-12 font-medium">Partner with us for reliable, cross-industry bulk fuel supply and transportation.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 shrink-0">
                    <Phone className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg mb-1 text-purple-950">Phone</h4>
                    <p className="text-slate-600 font-medium">+27 81 588 6265 <br/> +27 82 044 24941</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 shrink-0">
                    <Mail className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg mb-1 text-purple-950">Email</h4>
                    <p className="text-slate-600 font-medium">rixilenxalati@outlook.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 shrink-0">
                    <MapPin className="w-6 h-6 text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-lg mb-1 text-purple-950">Head Office</h4>
                    <p className="text-slate-600 font-medium">131 Bokmakierie Rd.<br />Rooihuiskraal, Centurion<br />0157, Gauteng, South Africa</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-purple-50 p-10 rounded-3xl border border-purple-100 shadow-2xl shadow-purple-900/10">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                {/* Hidden Subject Field to make the email look nice in her inbox */}
                <input type="hidden" name="subject" value="New Inquiry from Rixile Nxalati Website!" />

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-950">Name</label>
                    <Input type="text" name="name" required placeholder="John Doe" className="bg-white border-purple-100 py-6" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-950">Company</label>
                    <Input type="text" name="company" placeholder="Your Business" className="bg-white border-purple-100 py-6" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-950">Email</label>
                    <Input type="email" name="email" required placeholder="john@example.com" className="bg-white border-purple-100 py-6" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-purple-950">Phone</label>
                    <Input type="tel" name="phone" required placeholder="+27 00 000 0000" className="bg-white border-purple-100 py-6" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-purple-950">Message</label>
                  <Textarea name="message" required placeholder="How can we assist with your fuel requirements?" className="bg-white border-purple-100 min-h-[120px] resize-none" />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-purple-900 text-white hover:bg-purple-800 rounded-xl py-6 text-lg font-bold shadow-lg shadow-purple-900/20 mt-4 disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                </Button>

                {formStatus === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-green-600 font-bold mt-4">
                    <CheckCircle2 size={20} />
                    Message sent successfully! We will be in touch.
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <p className="text-red-500 font-bold text-center mt-4">Something went wrong. Please try again.</p>
                )}

              </form>
            </motion.div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 px-6 border-t border-purple-100">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <img src="/logo.png" alt="Rixile Nxalati Logo" className="h-14 object-contain" />
          <div className="text-center md:text-right">
            <p className="font-bold text-purple-950 mb-1">Rixile Nxalati Pty. Ltd</p>
            <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} All rights reserved. Level 1 B-BBEE Contributor.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}