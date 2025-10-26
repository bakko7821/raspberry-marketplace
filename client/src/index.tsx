import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles/index.scss"
import "./styles/_normalize.scss"

import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { UserPage } from './pages/UserPage';
import { Header } from './components/Header';
import { AddCardPage } from './pages/AddCardPage';
import { CardPage } from './pages/CardPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/card/add" element={<AddCardPage />} />
        <Route path="/card/:id" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
