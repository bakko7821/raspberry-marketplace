import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/index.scss"
import "./styles/_normalize.scss"

import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { UserPage } from './pages/UserPage';
import { Header } from './components/Header';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart/:id" element={<CartPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
