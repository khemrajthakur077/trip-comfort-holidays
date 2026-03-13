import './App.css'
import React, { useEffect, useState } from 'react'; // React hooks add kiye
import { supabase } from './supabaseClient'; // Supabase import zaroori hai
import Login from './pages/Login'
import ManagePackages from './pages/ManagePackages';
import Dashboard from './pages/Dashboard';
import ManageOffers from './pages/ManageOffers';
import ManageBlogs from './pages/ManageBlogs';

import ScrollToTop from './components/ScrollToTop'
import Header from './components/header'
import Footer from './components/footer'
import Blogs from './pages/blogs'
import Offers from './pages/offers'
import Home from './pages/home'
import './index.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom' // Navigate add kiya

// ... baaki saare imports same hain ...
import Honeymoon from './packages/honeymoon'
import Family from "./packages/family";
import Adventure from "./packages/adventure";
import Himachal from "./packages/himachal";
import Kashmir from "./packages/kashmir";
import Kerala from "./packages/kerala";
import Rajstan from "./packages/rajstan";
import Sikkim from "./packages/sikkim";
import Uttarakhand from "./packages/uttarakhand";
import Spiti from "./packages/spiti";
import LehLadakh from "./packages/LehLadakh";
import GoldenTriangle from "./packages/GoldenTriangle";
import Singapore from "./packages/singapore";
import Dubai from "./packages/dubai";
import DynamicTourPage from "./components/pkgDetail"
import FAQPage from './pages/FAQ';
import AboutPage from './pages/aboutUs';
import ContactPage from './pages/contactUs';
import GuestGallery from './pages/guestGallery';
import TermsPage from './pages/termsAndConditions';
import PrivacyPage from './pages/privacyPolicy';
import PaymentPage from './pages/payNow';
import JoinUsPage from './pages/joinUs';
import NotFound from './pages/notFound';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined rakhein taaki loading pata chale

  useEffect(() => {
    // Session check karne ka sabse solid tarika
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Jab tak session check ho raha hai, tab tak kuch mat dikhao (Screen Blank rakho)
  if (session === undefined) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdminPage && <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/family" element={<Family />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/honeymoon" element={<Honeymoon />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/offers' element={<Offers />} />

        {/* India Destinations */}
        <Route path="/himachal" element={<Himachal />} />
        <Route path="/kashmir" element={<Kashmir />} />
        <Route path="/kerala" element={<Kerala />} />
        <Route path="/rajstan" element={<Rajstan />} />
        <Route path="/sikkim" element={<Sikkim />} />
        <Route path="/uttarakhand" element={<Uttarakhand />} />
        <Route path="/spiti" element={<Spiti />} />
        <Route path="/lehLadakh" element={<LehLadakh />} />
        <Route path="/goldenTriangle" element={<GoldenTriangle />} />

        {/* International */}
        <Route path="/singapore" element={<Singapore />} />
        <Route path="/dubai" element={<Dubai />} />
        <Route path="/tour/:id" element={<DynamicTourPage />} />

        {/* Footer Pages */}
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/guestGallery" element={<GuestGallery />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/pay" element={<PaymentPage />} />
        <Route path="/join-us" element={<JoinUsPage />} />

        {/* Public Login Page */}
        <Route path="/admin/login" element={<Login />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/manage-packages" element={<ProtectedRoute><ManagePackages /></ProtectedRoute>} />
        <Route path="/admin/manage-offers" element={<ProtectedRoute><ManageOffers /></ProtectedRoute>} />
        <Route path="/admin/manage-blogs" element={<ProtectedRoute><ManageBlogs /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  )
}

export default App