import React from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ServiceCard from '../components/ServiceCard';
import ProviderCard from '../components/ProviderCard';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQSection from '../components/FAQSection';
import { useApp } from '../context/AppContext';
import { Layers, ShieldCheck, ArrowRight, ShoppingBag, Briefcase, Sparkles, Handshake, HeartPulse, Scale, Building2 } from 'lucide-react';

export default function HomePage() {
  const { servicesList, providersList, setCurrentPage, setIsMediatorModalOpen, language } = useApp();

  const featuredServices = servicesList.filter((s) => s.featured).slice(0, 4);
  const featuredProviders = providersList.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Public Citizen Mediator & Concierge Hub Banner */}
      <section className="py-2 -mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-sky-700/60">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
                <Handshake className="w-4 h-4 text-amber-400" />
                {language === 'hi' ? 'सार्वजनिक नागरिक मध्यस्थता केंद्र (Public Mediator)' : 'Public Mediator & Direct Concierge Hub'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
                {language === 'hi'
                  ? 'डॉक्टर/अस्पताल, तहसील/वकील या व्यापारी से सीधा संपर्क चाहिए?'
                  : 'Need Direct Connection to Doctor/Hospital, Advocate/Tehsil or Vendor?'}
              </h2>
              <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'पब्लिक मददगार आपके लिए मध्यस्थ (Mediator) के रूप में कार्य करता है। अपनी आवश्यकता बताएं और हम आपको सीधे सही विशेषज्ञ या अस्पताल से जोड़ेंगे।'
                  : 'Public Madadgar acts as your direct trusted mediator. Submit your requirement and we will connect you directly with the right expert, doctor or hospital.'}
              </p>
            </div>

            <button
              onClick={() => setIsMediatorModalOpen(true)}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all shrink-0"
            >
              <Handshake className="w-4.5 h-4.5 text-slate-950" />
              <span>{language === 'hi' ? 'सीधा संपर्क अनुरोध करें' : 'Connect Me Directly Now'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 21 Categories Grid */}
      <CategoryGrid limit={12} />

      {/* 4. Featured Services Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-extrabold text-amber-800 uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {language === 'hi' ? 'सर्वाधिक मांगी जाने वाली सेवाएं' : 'Top Requested Services'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {language === 'hi' ? 'मुख्य सत्यापित सेवाएं (यूपी एवं भारत)' : 'Featured Verified Services'}
              </h2>
            </div>

            <button
              onClick={() => setCurrentPage('services')}
              className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 group shrink-0"
            >
              <span>{language === 'hi' ? 'सभी सेवाएं देखें' : 'Explore All Services'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Verified Provider Spotlight */}
      <section className="py-10 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {language === 'hi' ? 'एडमिन द्वारा बैकग्राउंड सत्यापित' : 'Admin Background Checked'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {language === 'hi' ? 'विशेषज्ञ सलाहकार (सीए, वकील व कंसल्टेंट)' : 'Featured Expert Consultants'}
              </h2>
            </div>

            <button
              onClick={() => setCurrentPage('providers')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group shrink-0"
            >
              <span>{language === 'hi' ? 'विशेषज्ञ डायरेक्टरी देखें' : 'View Provider Directory'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. How It Works Timeline */}
      <HowItWorks />

      {/* 7. Product Marketplace Highlight Banner */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-3xl border border-amber-300 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200">
                <ShoppingBag className="w-3.5 h-3.5" /> 
                {language === 'hi' ? 'ऑनलाइन बाज़ार (मार्केटप्लेस)' : 'Online Product Marketplace'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                {language === 'hi'
                  ? 'बायोमेट्रिक मशीन (मंत्रा), डीएससी टोकन, बिलिंग प्रिंटर व पुस्तकें खरीदें'
                  : 'Shop Biometric Devices, Tax Handbooks & Office Equipment'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {language === 'hi'
                  ? 'आयुष्मान भारत व सीएससी हेतु यूआईडीएआई स्वीकृत फिंगरप्रिंट मशीन, क्लास 3 डीएससी टोकन, प्रिंटर व कानूनी पुस्तकें मुफ़्त डिलीवरी के साथ ऑर्डर करें।'
                  : 'Purchase STQC Aadhaar biometric scanners, Class 3 DSC tokens, Tally printers, and taxation guides with 100% verified seller guarantee and fast India post/courier delivery.'}
              </p>
            </div>

            <button
              onClick={() => setCurrentPage('marketplace')}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all shrink-0"
            >
              <ShoppingBag className="w-4 h-4 text-slate-950" />
              <span>{language === 'hi' ? 'मार्केटप्लेस स्टोर खोलें' : 'Explore Marketplace Store'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8. Testimonials & FAQs */}
      <Testimonials />
      <FAQSection />

      {/* 9. Join as Provider Banner CTA */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 p-8 sm:p-12 rounded-3xl text-center space-y-4 max-w-4xl mx-auto shadow-2xl">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-pulse" />
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {language === 'hi'
                ? 'क्या आप वकील, सीए, जन सेवा केंद्र या सेवा प्रदाता हैं?'
                : 'Are You a Professional CA, Advocate, Consultant, or Seller?'}
            </h2>
            <p className="text-sky-100 text-xs sm:text-sm max-w-xl mx-auto font-medium">
              {language === 'hi'
                ? 'पब्लिक मददगार कंसल्टेंसी से जुड़ें। 12-चरणीय पंजीकरण पूरा करें और पूरे यूपी व भारत से सीधी ग्राहक लीड प्राप्त करें।'
                : 'Join Public Madadgar Consultancy today. Complete our 12-step onboarding wizard and start receiving high-intent customer leads from across India.'}
            </p>
            <button
              onClick={() => setCurrentPage('onboarding')}
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-sm inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <Briefcase className="w-4 h-4 text-slate-950" />
              <span>{language === 'hi' ? 'अभी सेवा प्रदाता के रूप में जुड़ें' : 'Register as Verified Provider Now'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
