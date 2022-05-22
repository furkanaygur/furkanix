import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/*' element={<Header />}>
        <Route path='' element={<Home />} />
        <Route path='search' element={<Search />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}
