import React from 'react';
import { useApp } from './context/AppContext';
import { MessageCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BookingModal from './components/BookingModal';
import ProviderProfileModal from './components/ProviderProfileModal';
import ProductDetailModal from './components/ProductDetailModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import CategoryDetailModal from './components/CategoryDetailModal';
import MediatorConnectModal from './components/MediatorConnectModal';
import LegalModal from './components/LegalModal';
import LoginModal from './components/LoginModal';
import MobileBottomNav from './components/MobileBottomNav';

import HomePage from './pages/HomePage';
import ServiceMarketplacePage from './pages/ServiceMarketplacePage';
import ProviderDirectoryPage from './pages/ProviderDirectoryPage';
import ProductMarketplacePage from './pages/ProductMarketplacePage';
import AmazonMeeshoSyncPage from './pages/AmazonMeeshoSyncPage';
import ProviderOnboardingPage from './pages/ProviderOnboardingPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import ProviderDashboardPage from './pages/ProviderDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import CRMLeadsPage from './pages/CRMLeadsPage';
import IntegrationSettingsPage from './pages/IntegrationSettingsPage';
import BlogPage from './pages/BlogPage';
import SupportTicketsPage from './pages/SupportTicketsPage';

export default function App() {
  const { currentPage, isSidebarCollapsed } = useApp();

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white relative">
      {/* 1. Permanent / Responsive Left Sidebar */}
      <Sidebar />

      {/* 2. Main Body Container with Dynamic Margin Offset */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        {/* Top Header */}
        <Header />

        {/* Dynamic Page Router Content with Mobile Bottom Bar Padding Offset */}
        <main className="flex-1 pb-20 lg:pb-12">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'services' && <ServiceMarketplacePage />}
          {currentPage === 'providers' && <ProviderDirectoryPage />}
          {currentPage === 'marketplace' && <ProductMarketplacePage />}
          {currentPage === 'sync' && <AmazonMeeshoSyncPage />}
          {currentPage === 'onboarding' && <ProviderOnboardingPage />}
          {currentPage === 'customer-dash' && <CustomerDashboardPage />}
          {currentPage === 'provider-dash' && <ProviderDashboardPage />}
          {currentPage === 'admin-dash' && <AdminDashboardPage />}
          {currentPage === 'crm' && <CRMLeadsPage />}
          {currentPage === 'integrations' && <IntegrationSettingsPage />}
          {currentPage === 'blogs' && <BlogPage />}
          {currentPage === 'support' && <SupportTicketsPage />}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918604793347" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all hover:scale-110 z-50 flex items-center justify-center animate-bounce-slow"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-emerald-500 text-white" />
      </a>

      {/* Mobile App Bottom Tab Bar */}
      <MobileBottomNav />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <BookingModal />
      <ServiceDetailModal />
      <CategoryDetailModal />
      <MediatorConnectModal />
      <ProviderProfileModal />
      <ProductDetailModal />
      <LegalModal />
      <LoginModal />
      <Toast />
    </div>
  );
}
