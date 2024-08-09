import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Calendar from 'react-calendar';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const params = {
                amount: amount,
                username: localStorage.getItem('username')
            };

            const response = await ApiRequest(API_END_POINTS.CREATE_EXPENSES,'post', params);

            return alert("Expense created successfully!");
        } catch(error) {
            console.error(error);
            return alert("Invalid input ka");
        }
    };


    const [value, setValue] = useState(new Date());  // Initialize with a Date object

    const onChange = (newValue) => {
        setValue(newValue);
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
                                        <div className="form-group">
                                            <label className="form-label">Category</label>
                                            <label className="colon-label">:</label>
                                            <select>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        {/*<div className="form-group">*/}
                                        {/*    <label className="form-label">Account</label>*/}
                                        {/*    <label className="colon-label">:</label>*/}
                                        {/*    <select>*/}
                                        {/*        <option value=""></option>*/}
                                        {/*    </select>*/}
                                        {/*</div>*/}
                                        <div className="form-group">
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
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <label className="colon-label">:</label>
                                            <input type="date"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Note</label>
                                            <label className="colon-label">:</label>
                                            <div className="textarea-wrapper">
                                                <textarea></textarea>
                                                <div className="add-btn-container">
                                                    <button type="button" className="add-file-button">Upload File</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="add-btn-container">
                                            <button type="submit" className="add-btn">Add Expense</button>
                                        </div>
                                    </>
                                )}
                                {type === 'income' && (
                                    <>
                                        <div className="form-group">
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
                                        <div className="form-group">
                                            <label className="form-label">Date</label>
                                            <label className="colon-label">:</label>
                                            <input type="date"/>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Note</label>
                                            <label className="colon-label">:</label>
                                            <div className="textarea-wrapper">
                                                <textarea></textarea>
                                                <div className="add-btn-container">
                                                    <button type="button" className="add-file-button">Upload File
                                                    </button>
                                                </div>
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


                    <div className="record-right-container">
                        <div className="calendar-container-record">
                            <div className="calendar-header">
                                <span>&lt;</span>
                                <h3>January 2024</h3>
                                <span>&gt;</span>
                            </div>
                            {/*<div className="calendar-container">*/}


                            {/*    <div className="calendar">*/}
                            {/*        <div className="days">*/}
                            {/*            <div>Sun</div>*/}
                            {/*            <div>Mon</div>*/}
                            {/*            <div>Tue</div>*/}
                            {/*            <div>Wed</div>*/}
                            {/*            <div>Thu</div>*/}
                            {/*            <div>Fri</div>*/}
                            {/*            <div>Sat</div>*/}
                            {/*        </div>*/}

                            {/*        <div className="dates">*/}
                            {/*            /!* Populate with date elements *!/*/}
                            {/*            {Array.from({length: 31}, (_, index) => (*/}
                            {/*                <div key={index}>{index + 1}</div>*/}
                            {/*            ))}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}


                            {/*</div>*/}
                            <div>
                                <Calendar onChange={onChange} value={value}/>
                            </div>
                            <div className="view-report">View report</div>
                        </div>

                    </div>

                </div>

            </div>


        </div>
    );
}

export default RecordPage;
