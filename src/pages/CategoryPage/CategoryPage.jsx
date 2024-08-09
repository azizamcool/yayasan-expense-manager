import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import './CategoryPage.css';
import API_END_POINTS from '../../config/api-end-points';
import ApiRequest from '../../config/api-request';

const CategoryPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const params = {
                categoryName: categoryName,
                username: localStorage.getItem('username')
            };

            const response = await ApiRequest(API_END_POINTS.CREATE_CATEGORY, 'post', params);

            return alert("New Category " + categoryName + " created successfully!");
        } catch(error) {
            console.error(error);
        }
    };

    return (
        <div className="wrapper">
            <div className={`header ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="header-item expense">
                    <h2>Category</h2>
                </div>
            </div>

            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className={`category-container container ${isSidebarOpen ? 'blurred' : ''}`}>
                <div className='category-card'>
                    <form id="categoryForm" onSubmit={handleFormSubmit}>
                        <div className="form-group">
                            <label className='category-form-label' htmlFor="categoryName">Category Name</label>
                            <span className='category-span'>:</span>
                            <input
                                className='category-input'
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                        </div>
                        <button className="submit-category-btn" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;