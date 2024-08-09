export const API_URL = 'http://localhost:8080';

const API_END_POINTS = {
    USER_LOGIN: `${API_URL}/login`,
    USER_SIGNUP: `${API_URL}/register`,
    GET_EXPENSES: `${API_URL}/getExpense`,
    CREATE_EXPENSES: `${API_URL}/expense`,
    GET_BUDGETS: `${API_URL}/budgets`,
    CREATE_BUDGET: `${API_URL}/budget`,
    GET_CATEGORY: `${API_URL}/getUserCategory`,
    CREATE_INCOME: `${API_URL}/income`,
    GET_INCOME: `${API_URL}/getIncome`,
    CREATE_CATEGORY: `${API_URL}/category`,
    UPDATE_CURRENCY: `${API_URL}/updateCurrency`,
    APPLY_EXCHANGE_RATE_EXPENSE: `${API_URL}/updateExpensesWithExchangeRate`,
    APPLY_EXCHANGE_RATE_BUDGET: `${API_URL}/updateBudgetsWithExchangeRate`,
}

export default API_END_POINTS