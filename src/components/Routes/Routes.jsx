import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home'
import { ROUTES } from '../../utils/routes';
import SingleProduct from '../SingleProduct';
import SingleCategory from '../SingleCategory';
import Cart from '../Cart';

export default function AppRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
          <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
          <Route path={ROUTES.CART} element={<Cart />} />
        </Routes>
    );
  }