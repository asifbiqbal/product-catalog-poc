
import './App.css';
import React from 'react'
import ProductList from './components/Products/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';




function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
   </Router>
  )
}

export default App;
