import React, { createContext, useContext, useState } from 'react';
import { CATEGORIES, SERVICES, PROVIDERS, PRODUCTS, MOCK_LEADS, BLOGS } from '../data/mockData';
import confetti from 'canvas-confetti';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global Role: 'customer' | 'provider' | 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('pmc_role') || 'customer');
  
  // Theme: Light mode default
  const [darkMode, setDarkMode] = useState(false);

  // Language State: 'en' | 'hi'
  const [language, setLanguage] = useState(() => localStorage.getItem('pmc_lang') || 'en');

  // Active Navigation Page
  const [currentPage, setCurrentPage] = useState('home');

  // Sidebar States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pmc_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Location selector
  const [location, setLocation] = useState({
    state: 'Delhi',
    city: 'New Delhi',
    pincode: '110001'
  });

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modals visibility
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  // Dynamic Stores
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [servicesList, setServicesList] = useState(SERVICES);
  const [providersList, setProvidersList] = useState(PROVIDERS);
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [leadsList, setLeadsList] = useState(MOCK_LEADS);

  // Cart & Wishlist
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Customer Requests
  const [customerRequests, setCustomerRequests] = useState([
    {
      id: 'req-201',
      serviceName: 'Income Tax Return (ITR-1) Filing',
      providerName: 'CA Rajesh Verma & Associates',
      status: 'In Progress',
      date: '2026-08-11',
      price: 499,
      category: 'Tax & Accounting'
    }
  ]);

  // Provider Submissions
  const [pendingProviders, setPendingProviders] = useState([
    {
      id: 'prov-pending-1',
      name: 'Advocate Alok Sharma',
      businessName: 'Sharma & Partners Law Firm',
      category: 'Legal Services',
      city: 'Jaipur',
      state: 'Rajasthan',
      experienceYears: 7,
      status: 'Pending Verification',
      submittedAt: '2026-08-12 10:00'
    }
  ]);

  // Commission Rates Configuration
  const [commissionConfig, setCommissionConfig] = useState({
    defaultRate: 10,
    categoryRates: {
      'Tax & Accounting': 10,
      'Legal Services': 12,
      'Property / Real Estate': 15,
      'Government Services': 8,
      'Online Shopping (Marketplace)': 5
    }
  });

  // System Integrations Settings
  const [integrations, setIntegrations] = useState({
    meta: {
      connected: true,
      pageName: "Public Madadgar Consultancy Official",
      appId: "9823471029348",
      pixelId: "PX-8823491",
      leadAdsSync: true,
      lastSync: "2026-08-12 21:00"
    },
    whatsapp: {
      connected: true,
      businessPhone: "+91 98765 00000",
      wabaId: "WABA-99238471",
      templatesCount: 8,
      autoLeadReply: true
    },
    paymentGateway: {
      provider: "Razorpay",
      connected: true,
      keyId: "rzp_live_893247982",
      mode: "Live Engine Ready",
      payoutsEnabled: true
    },
    amazonMeeshoSync: {
      amazonConnected: true,
      meeshoConnected: true,
      autoSyncInventory: true,
      autoSyncOrders: true,
      lastOrderSync: "2026-08-12 20:30"
    }
  });

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti triggered');
    }
  };

  // Switch role wrapper
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    localStorage.setItem('pmc_role', newRole);
    showToast(`Active View Mode: ${newRole.toUpperCase()}`, 'info');
  };

  // Switch Language Handler
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('pmc_lang', newLang);
    showToast(newLang === 'hi' ? 'भाषा बदलकर हिंदी कर दी गई है!' : 'Language switched to English!', 'info');
  };

  // User Login simulation
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('pmc_user', JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}! Successfully logged in.`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('pmc_user');
    showToast('Logged out successfully', 'info');
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed item from cart', 'info');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Wishlist toggle
  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter((w) => w.id !== item.id);
      } else {
        showToast(`Saved to Wishlist!`);
        return [...prev, item];
      }
    });
  };

  // Submit new Service Request / Booking
  const submitServiceRequest = (bookingDetails) => {
    const newReq = {
      id: `req-${Date.now().toString().slice(-4)}`,
      serviceName: bookingDetails.serviceName,
      providerName: bookingDetails.providerName || 'Assigned Expert',
      status: 'Assigned',
      date: new Date().toISOString().split('T')[0],
      price: bookingDetails.price,
      category: bookingDetails.category || 'General',
      customerDetails: bookingDetails.customerDetails
    };

    setCustomerRequests((prev) => [newReq, ...prev]);

    const newLead = {
      id: `lead-${Date.now().toString().slice(-4)}`,
      customerName: bookingDetails.customerDetails.name,
      phone: bookingDetails.customerDetails.phone,
      email: bookingDetails.customerDetails.email,
      serviceCategory: bookingDetails.category || 'General',
      serviceRequested: bookingDetails.serviceName,
      source: 'Website Booking Engine',
      campaign: 'Direct_Web_Booking',
      assignedProviderId: bookingDetails.providerId || 'prov-1',
      assignedProviderName: bookingDetails.providerName || 'CA Rajesh Verma',
      status: 'New',
      createdAt: new Date().toLocaleString(),
      notes: bookingDetails.notes || 'Submitted via online booking wizard'
    };

    setLeadsList((prev) => [newLead, ...prev]);
    triggerConfetti();
    showToast('Your service request has been successfully submitted!', 'success');
  };

  // Provider Onboarding Submission
  const submitProviderOnboarding = (formData) => {
    const newProviderApp = {
      id: `prov-pending-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      businessName: formData.businessName,
      category: formData.category,
      city: formData.city,
      state: formData.state,
      experienceYears: formData.experience,
      status: 'Pending Verification',
      submittedAt: new Date().toLocaleString(),
      details: formData
    };

    setPendingProviders((prev) => [newProviderApp, ...prev]);
    triggerConfetti();
    showToast('Provider application submitted for Admin Verification!', 'success');
  };

  // Admin Verification Toggle
  const approveProvider = (providerId) => {
    const app = pendingProviders.find((p) => p.id === providerId);
    if (app) {
      const newApprovedProvider = {
        id: `prov-${Date.now().toString().slice(-4)}`,
        name: app.name,
        businessName: app.businessName,
        category: app.category,
        city: app.city,
        state: app.state,
        rating: 5.0,
        reviewCount: 1,
        experienceYears: app.experienceYears,
        verified: true,
        badge: 'Verified Expert',
        startingPrice: 499,
        serviceRadius: `${app.city} & Online`,
        availability: 'Available Now',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        about: `${app.businessName} provides high quality professional services in ${app.category}.`,
        qualifications: ['Verified Professional Certificate'],
        servicesOffered: [app.category],
        workingHours: 'Mon-Sat: 09:00 AM - 07:00 PM',
        socialLinks: {}
      };

      setProvidersList((prev) => [newApprovedProvider, ...prev]);
      setPendingProviders((prev) => prev.filter((p) => p.id !== providerId));
      showToast(`Provider "${app.name}" approved with Verified Badge!`);
    }
  };

  const updateLeadStatus = (leadId, newStatus) => {
    setLeadsList((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    showToast(`Lead status updated to: ${newStatus}`);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        handleRoleChange,
        darkMode,
        setDarkMode,
        language,
        setLanguage: handleLanguageChange,
        currentPage,
        setCurrentPage,
        isSidebarOpen,
        setIsSidebarOpen,
        isSidebarCollapsed,
        setIsSidebarCollapsed,

        user,
        loginUser,
        logoutUser,
        isLoginModalOpen,
        setIsLoginModalOpen,

        location,
        setLocation,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedProvider,
        setSelectedProvider,
        selectedService,
        setSelectedService,
        selectedProduct,
        setSelectedProduct,

        isBookingModalOpen,
        setIsBookingModalOpen,
        isProviderModalOpen,
        setIsProviderModalOpen,
        isProductModalOpen,
        setIsProductModalOpen,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isLegalModalOpen,
        setIsLegalModalOpen,

        categoriesList,
        servicesList,
        providersList,
        productsList,
        leadsList,
        customerRequests,
        pendingProviders,
        commissionConfig,
        setCommissionConfig,
        integrations,
        setIntegrations,

        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        wishlist,
        toggleWishlist,

        submitServiceRequest,
        submitProviderOnboarding,
        approveProvider,
        updateLeadStatus,

        toast,
        showToast,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
