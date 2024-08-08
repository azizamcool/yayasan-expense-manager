export const API_URL = 'http://localhost:8080';

const API_END_POINTS = {
    USER_LOGIN: `${API_URL}/login`,
    USER_SIGNUP: `${API_URL}/register`,
    GET_EXPENSES: `${API_URL}/getExpense`,
    GET_BUDGETS: `${API_URL}/budgets`,
    CREATE_BUDGET: `${API_URL}/budget`,
    GET_CATEGORY: `${API_URL}/getUserCategory`,
}

export default API_END_POINTS