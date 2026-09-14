import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('landing');

  return (
    <div className="app">
      {currentView !== 'landing' && (
        <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      )}

      {currentView === 'landing' && (
        <LandingPage onGetStarted={() => setCurrentView('products')} />
      )}

      {currentView === 'products' && <ProductList />}

      {currentView === 'cart' && (
        <CartItem onContinueShopping={() => setCurrentView('products')} />
      )}
    </div>
  );
}


// App.jsx
import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  // Explicit function handler to switch from landing page to product list
  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      {!showProductList ? (
        <div className="landing-page background-image">
          <div className="content">
            <h1>Paradise Nursery</h1>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </div>
      ) : (
        <ProductList />
      )}
    </div>
  );
}

export default App;