import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

// import pages
import SignInPage from './pages/SingInPage/SignInPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/register" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App
