import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import BookingModal from './components/BookingModal';
import ProviderProfileModal from './components/ProviderProfileModal';
import ProductDetailModal from './components/ProductDetailModal';
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
    <div className="min-h-screen flex bg-slate-50 text-slate-800 font-sans selection:bg-sky-500 selection:text-white">
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

      {/* Mobile App Bottom Tab Bar */}
      <MobileBottomNav />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <CheckoutModal />
      <BookingModal />
      <ProviderProfileModal />
      <ProductDetailModal />
      <LegalModal />
      <LoginModal />
      <Toast />
    </div>
  );
}
