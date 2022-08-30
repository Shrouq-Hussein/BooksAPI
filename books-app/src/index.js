import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "./pages/notFound.js"
import BookDetails from "./components/bookDetails/bookDetails.js"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<App />}/>
            <Route path={"/bookDetails/:bookid"} element={<BookDetails />} />
            <Route path={"*"}element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);


reportWebVitals();
