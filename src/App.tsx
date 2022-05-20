import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import ProductList from './components/ProductList';

function App() {
  useEffect(() => {});
  return (
    <>
      <Header title="titolo" description="description" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/collections/:id" element={<ProductList />}></Route>
        <Route path="/products/:id" element={<Product />}></Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
