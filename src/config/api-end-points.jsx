export const API_URL = 'http://localhost:8080';

const API_END_POINTS = {
    USER_LOGIN: `${API_URL}/login`,
    USER_SIGNUP: `${API_URL}/register`,
    GET_EXPENSES: `${API_URL}/getExpense`,
    CREATE_EXPENSES: `${API_URL}/expense`,
    GET_BUDGETS: `${API_URL}/budgets`,
    CREATE_BUDGET: `${API_URL}/budget`,
    GET_CATEGORY: `${API_URL}/getUserCategory`,
    CREATE_CATEGORY: `${API_URL}/category`,
}

export default API_END_POINTS