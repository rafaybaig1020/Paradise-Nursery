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

export default App;