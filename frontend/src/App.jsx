// App entry point with AI feature
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';

import SmartDiscovery from './pages/SmartDiscovery';

import Services from './pages/Services';
import RetailServices from './pages/RetailServices';
import Checkout from './pages/Checkout';

import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';

function App() {
  return (
    <CartProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <div className="flex flex-col min-h-screen">
          {/* Navbar - Fixed at top */}
          <Navbar />

          {/* Main Content - Grows to fill space */}
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/retail-services" element={<RetailServices />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/discover" element={<SmartDiscovery />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          {/* Footer - Always at bottom */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
