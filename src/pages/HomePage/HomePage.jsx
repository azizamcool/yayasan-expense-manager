import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

import Sidebar from '../../components/Sidebar';
import ApiRequest from '../../config/api-request';
import API_END_POINTS from '../../config/api-end-points';

import './HomePage.css';

const COLORS = ['#3498db', '#2ecc71', '#f1c40f', '#e74c3c', '#9b59b6'];

const MonthlyDonutChart = ({ data, total, month, year }) => {

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={28}>
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={140}
                        fill="#8884d8"
                        dataKey="value"
                    >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

const ExpenseItem = ({ name, amount, percentage }) => (
    <div className="expense-item">
        <div className="expense-details">
            <div className='expense-name'>{name}</div>
            <div className='expense-amount'>{amount}</div>
        </div>
        <div className="expense-percentage">
            {percentage}
        </div>
    </div>
);

const HomePage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const [allExpenses, setAllExpenses] = useState(null);

    const [totalExpense, setTotalExpenses] = useState(null);
    const [totalBudget, setTotalBudget] = useState(null);
    const [balance, setBalance] = useState(null);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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

            console.log(_expenses);
            setTotalExpenses(_totalExpense);
            setAllExpenses(_expenses);
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

            let _totalBudget = 0;
            budgets.map((b) => {
                _totalBudget += b.amount;
            })

            setTotalBudget(_totalBudget);
        } catch(error) {
            console.error(error);
        }
    }

    const getCurrentMonthAndYear = () => {
        const now = new Date();
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[now.getMonth()];
        const year = now.getFullYear();
        return { month, year };
    };

    useEffect(() => {
        // if not logged in, go to login page
        if (!localStorage.getItem('username')) {
            return navigate('/login');
        }

        handleGetExpenses();
        handleGetBudgets();
    }, []);

    useEffect(() => {
        if (totalExpense && totalBudget) {
            const _balance = totalBudget - totalExpense;
            setBalance(_balance);
        }
    }, [handleGetBudgets]);

    const renderExpenseItem = (allExpenses) => {
        const totalExpense = allExpenses.reduce((total, ex) => total + ex.value, 0);

        return (
            <div className="expenses-list">
                {allExpenses && allExpenses.map((ex) => {
                    const percentage = ((ex.value / totalExpense) * 100).toFixed(2) + '%';
                    return (
                        <ExpenseItem
                            key={ex.name} // Ensure each item has a unique key
                            name={ex.name}
                            amount={`RM ${ex.value}`}
                            percentage={percentage}
                        />
                    );
                })}
            </div>
        );
    };

    const handleRecord = (route) => {
        navigate("/record/expense");
    };

    return(
        <div className="wrapper">
            <div className={`header ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="header-item expense">
                    <h2>Expense</h2>
                    <p>RM {totalExpense}</p>
                </div>
                <div className="header-item income">
                    <h2>Income</h2>
                    <p>RM 3830</p>
                </div>
                <div className="header-item balance">
                    <h2>Balance</h2>
                    <p>RM {balance}</p>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`container ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="home-left-container">
                    <div className="expenses-list">
                    {   
                        allExpenses &&
                        renderExpenseItem(allExpenses)
                    }
                    </div>
                </div>
                <div className="home-right-container">
                    <div className="spending-chart">
                        <h3>SPENDING FOR</h3>
                        <div className='month-date'>&lt; {getCurrentMonthAndYear().month} {getCurrentMonthAndYear().year} &gt;</div>
                        <div className="chart">
                            {
                                allExpenses &&
                                <MonthlyDonutChart
                                    data={allExpenses}
                                    month="January"
                                    year="2024"
                                />
                            }
                        </div>
                        <div className='chart-footer-text'>
                            <div>Total RM {totalExpense}</div>
                            <button className="plus-button"  onClick={handleRecord} >+</button> {/* Add your
                             button here */}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;