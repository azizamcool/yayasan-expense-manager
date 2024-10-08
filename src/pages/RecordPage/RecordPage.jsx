import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import './RecordPage.css';

import Sidebar from '../../components/Sidebar';
import ApiRequest from "../../config/api-request.jsx";
import API_END_POINTS from "../../config/api-end-points.jsx";

const RecordPage = ({type}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleRecord = (route) => {
        navigate(route);
    };

    const [amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [allCategories, setAllCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [incomeDate, setIncomeDate] = useState('');

    const handleGetCategory = async () => {
        try {
            const params = {
                username: localStorage.getItem('username')
            };

            const categories = await ApiRequest(API_END_POINTS.GET_CATEGORY, 'get', params);
            setAllCategories(categories)
            setSelectedCategory(categories[0].id);

        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleGetCategory();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let params;
            let response;

            if (type === 'expense') {
                params = {
                    amount: amount,
                    notes: notes,
                    expenseDate: expenseDate,
                    categoryId: selectedCategory,
                    imageUrl: '',
                    username: localStorage.getItem('username')
                };
                response = await ApiRequest(API_END_POINTS.CREATE_EXPENSES, 'post', params);

                setAmount('');
                setExpenseDate('');
                return alert("Expense created successfully!");
            } else if (type === 'income') {
                params = {
                    amount: amount,
                    notes: notes,
                    incomeDate: incomeDate,
                    username: localStorage.getItem('username')
                };

                response = await ApiRequest(API_END_POINTS.CREATE_INCOME, 'post', params);

                setAmount('');
                setIncomeDate('');
                return alert("Income created successfully!");
            }
        } catch(error) {
            console.error(error);
            return alert("Invalid input");
        }
    };

    return (
        <div className="wrapper">
            <div className={`record-header ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <div className="record-Bar"></div>
                    <div className="record-Bar"></div>
                    <div className="record-Bar"></div>
                </div>
                <div className="record-header record-title">
                    <h2>Record</h2>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>


            <div className={`content-record ${isSidebarOpen ? 'blurred' : ''}`}>

                <div className="content-record">

                    <div className="record-left-container">

                        <div className="form-button">
                            <button className="expense-btn" onClick={() => handleRecord('/record/expense')}>Expense
                            </button>
                            <button className="income-btn" onClick={() => handleRecord('/record/income')}>Income
                            </button>
                        </div>
                        <div className="form-container-record">
                            <form onSubmit={handleSubmit}>
                                {type === 'expense' && (
                                    <>
                                        <div className="form-group-expense">
                                            <label className="form-label">Category</label>
                                            <label className="colon-label">:</label>
                                            <select id="category" name="category"
                                                value={selectedCategory}
                                                onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category state
                                            >
                                                {
                                                    allCategories && allCategories.map((category) => (
                                                        <option key={category.id} value={category.id}>{category.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group-expense">
                                            <label htmlFor="amount" className="form-label">Amount</label>
                                            <label className="colon-label">:</label>
                                            <input
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group-expense">
                                            <label className="form-label">Date</label>
                                            <label className="colon-label">:</label>
                                            <input type="date"
                                                   id="expenseDate"
                                                   name="expenseDate"
                                                   value={expenseDate}
                                                   onChange={(e) => setExpenseDate(e.target.value)}/>
                                        </div>
                                        <div className="form-group-expense">
                                            <label className="form-label">Note</label>
                                            <label className="colon-label">:</label>
                                            <div className="textarea-wrapper">
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                ></textarea>

                                            </div>
                                        </div>
                                        <div className="add-btn-container">
                                            <button type="submit" className="add-btn">Add Expense</button>
                                        </div>
                                    </>
                                )}
                                {type === 'income' && (
                                    <>
                                        <div className="form-group-expense">
                                            <label htmlFor="amount" className="form-label">Amount</label>
                                            <label className="colon-label">:</label>
                                            <input
                                                type="number"
                                                id="amount"
                                                name="amount"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group-expense">
                                            <label className="form-label">Date</label>
                                            <label className="colon-label">:</label>
                                            <input type="date"
                                                   id="incomeDate"
                                                   name="incomeDate"
                                                   value={incomeDate}
                                                   onChange={(e) => setIncomeDate(e.target.value)}/>
                                        </div>
                                        <div className="form-group-expense">
                                            <label className="form-label">Note</label>
                                            <label className="colon-label">:</label>
                                            <div className="textarea-wrapper">
                                                <textarea
                                                    id="notes"
                                                    name="notes"
                                                    value={notes}
                                                    onChange={(e) => setNotes(e.target.value)}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="add-btn-container">
                                            <button type="submit" className="add-btn">Add Income</button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>


                    </div>

                </div>

            </div>


        </div>
    );
}

export default RecordPage;
