import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="container">
            <header>
                <div className="menu-icon">&#9776;</div>
                <div className="header-item expense">Expense <br /> <span>RM 2830</span></div>
                <div className="header-item income">Income <br /> <span>RM 3830</span></div>
                <div className="header-item balance">Balance <br /> <span>RM 1000</span></div>
            </header>
            <main>
                <section className="accounts">
                    <h2>List of Accounts</h2>
                    <div className="account-list">
                        <div className="account">Card <br /> <span>RM 3000</span></div>
                        <div className="account">Cash <br /> <span>RM 200</span></div>
                        <div className="account">Bank <br /> <span>RM 200</span></div>
                        <div className="account">e-wallet <br /> <span>RM 200</span></div>
                        <div className="account">Saving <br /> <span>RM 200</span></div>
                    </div>
                    <div className="expenses">
                        <div className="expense-item">
                            <p>Rent & Mortgage</p>
                            <span>RM 800</span>
                            <div className="percentage">48%</div>
                        </div>
                        <div className="expense-item">
                            <p>Groceries</p>
                            <span>RM 350</span>
                            <div className="percentage">32%</div>
                        </div>
                        <div className="expense-item">
                            <p>Shopping</p>
                            <span>RM 230</span>
                            <div className="percentage">27%</div>
                        </div>
                        <div className="expense-item">
                            <p>Restaurant</p>
                            <span>RM 122</span>
                            <div className="percentage">22%</div>
                        </div>
                        <div className="expense-item">
                            <p>Credit</p>
                            <span>RM 90</span>
                            <div className="percentage">12%</div>
                        </div>
                    </div>
                </section>
                <section className="spending">
                    <h2>SPENDING FOR <br /> <span>&lt; January 2024 &gt;</span></h2>
                    <div className="spending-chart">
                        <div className="spending-amount">RM 2380</div>
                    </div>
                    <div className="add-expense">
                        <button>+</button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;
