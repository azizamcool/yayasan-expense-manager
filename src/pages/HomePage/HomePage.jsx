import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Sidebar from '../../components/Sidebar';

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

    const navigate = useNavigate();

    const data = [
        { name: 'Category 1', value: 500 },
        { name: 'Category 2', value: 300 },
        { name: 'Category 3', value: 100 },
      ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        // if not logged in, go to login page
        if (!localStorage.getItem('username')) {
            navigate('/login');
        }
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
                    <h2>Expense</h2>
                    <p>RM 2830</p>
                </div>
                <div className="header-item income">
                    <h2>Income</h2>
                    <p>RM 3830</p>
                </div>
                <div className="header-item balance">
                    <h2>Balance</h2>
                    <p>RM 1000</p>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`container ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="home-left-container">
                    <div className="expenses-list">
                        <ExpenseItem name="Rent & Mortgage" amount="RM 800" percentage="48%" />
                        <ExpenseItem name="Groceries" amount="RM 350" percentage="32%" />
                        <ExpenseItem name="Shopping" amount="RM 230" percentage="27%" />
                        <ExpenseItem name="Restaurant" amount="RM 122" percentage="22%" />
                        <ExpenseItem name="Credit" amount="RM 90" percentage="12%" />
                    </div>
                </div>
                <div className="home-right-container">
                    <div className="spending-chart">
                        <h3>SPENDING FOR</h3>
                        <div className='month-date'>&lt; January 2024 &gt;</div>
                        <div className="chart">
                            <MonthlyDonutChart
                                data={data}
                                total={total}
                                month="January"
                                year="2024"
                            />
                        </div>
                        <div className='chart-footer-text'>Total RM 2830</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;