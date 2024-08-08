import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';

// import pages
import SignInPage from './pages/SingInPage/SignInPage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import HomePage from './pages/HomePage/HomePage';
import BudgetPage from './pages/BudgetPage/BudgetPage';

const URL = 'http://localhost:8080/users';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path='/' element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
};

export default App
