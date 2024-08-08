import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar';
import ApiRequest from '../../config/api-request';
import API_END_POINTS from '../../config/api-end-points';

import './BudgetPage.css';

const BudgetPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allCategories, setAllCategories] = useState(null);

    const [allBudgets, setAllBudgets] = useState(null);
    const [allExpenses, setAllExpenses] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const category = event.target.category.value;
        const amount = parseInt(event.target.amount.value, 10);

        const categoryId = allCategories.find(cat => cat.name == category).id;
        try {
            const params = {
                username: localStorage.getItem('username'),
                categoryId: categoryId,
                amount: amount,
                periodStart: '2024-08-08',
                periodEnd: '2024-09-08',
            };

            const response = await ApiRequest(API_END_POINTS.CREATE_BUDGET, 'post', params);
            console.log("Response: ", response)            ;
        } catch(error) {
            console.error(error);
        }
    };

    const handleGetCategory = async () => {
        try {
            const params = {
                username: localStorage.getItem('username')
            };

            const categories = await ApiRequest(API_END_POINTS.GET_CATEGORY, 'get', params);
            setAllCategories(categories)
            
        } catch(error) {
            console.error(error);
        }
    }

    const handleGetBudgets = async () => {
        // get all budgets
        try {
            const params = {
                username: localStorage.getItem('username')
            };

            const budgets = await ApiRequest(API_END_POINTS.GET_BUDGETS, 'get', params);
            setAllBudgets(budgets);
        } catch(error) {
            console.error(error);
        }
    }

    const handleGetExpenses = async () => {
        // get expenses
        try {
            const params = {
                username: localStorage.getItem('username')
            };

            const expenses = await ApiRequest(API_END_POINTS.GET_EXPENSES, 'get', params);
            
            // let _totalExpense = 0;
            // let _expenses = [];
            // Group expenses by category and sum amounts
            const groupedExpenses = expenses.reduce((acc, expense) => {
                const categoryName = expense.category.name;
                if (!acc[categoryName]) {
                    acc[categoryName] = {
                        name: categoryName,
                        value: 0
                    };
                }

                acc[categoryName].value += expense.amount;
                return acc;
            }, {});

            // Transform the grouped object into an array
            const _expenses = Object.values(groupedExpenses);
            const _totalExpense = _expenses.reduce((total, expense) => total += expense.value, 0);

            setAllExpenses(_expenses);
        } catch(error) {
            console.error(error);
        }
    }

    const renderBudgetProgressBar = () => {
        const budgetOverview = allBudgets.map((budget) => {
            const expense = allExpenses.find(exp => exp.name === budget.category.name);
            return {
                category: budget.category.name,
                expenses: expense ? expense.value : 0,
                budget: budget.amount
            };
        });

        return (
            <div className='progress-bar-wrapper'>
                {budgetOverview && budgetOverview.map((budget, index) => (
                    <div key={budget.category + index} className='progress-bar-container'>
                        <div className='progress-bar-title'>
                            <h3>{budget.category}</h3>
                            <h3>RM {budget.expenses} / RM {budget.budget}</h3>
                        </div>
                        <div className='progress-bar'>
                            <div 
                                className='progress-bar-fill' 
                                style={{ width: `${(budget.expenses / budget.budget) * 100}%`, backgroundColor: (budget.expenses / budget.budget) > 0.8 ? 'red' : (budget.expenses / budget.budget) > 0.5 ? 'orange' : 'green' }}>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    useEffect(() => {
        handleGetCategory();
        handleGetExpenses();
        handleGetBudgets();
    }, []);

    return(
        <div className="wrapper">
            <div className={`header ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="header-item expense">
                    <h2>Budget</h2>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`container ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className='budget-left-container'>
                    <form id="budgetForm" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label className='budget-form-label' htmlFor="category">Category</label>
                            <span className='amount-span'>:</span>
                            <select className='dropdown-input' id="category" name="category">
                            {
                                allCategories && allCategories.map((category) => (
                                    <option key={category.name} value={category.name}>{category.name}</option>
                                ))
                            }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className='budget-form-label' htmlFor="amount">Amount</label>
                            <span className='amount-span'>:</span>
                            <input className='amount-input' type="number" id="amount" name="amount" required />
                        </div>
                        <button className="add-budget-btn" type="submit">Add Budget</button>
                    </form>
                </div>

                <div className='budget-right-container'>
                    <div className='budget-container-title'>
                            <h2>This month</h2>
                            <p className='expense-progress'>RM 100 / RM 10000</p>
                    </div>
                    {
                        allExpenses && allBudgets &&
                        renderBudgetProgressBar()
                    }
                </div>
            </div>
        </div>
    );
};

export default BudgetPage;