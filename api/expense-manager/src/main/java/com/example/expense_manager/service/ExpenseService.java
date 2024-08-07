package com.example.expense_manager.service;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Save new expense
    public Expense save(Expense expense) {
        LocalDateTime now = LocalDateTime.now();

        String str="2015-03-31";
        Date date=Date.valueOf(str);

        expense.setExpenseDate(date);
        expense.setCreatedAt(Timestamp.valueOf(now));
        expense.setUpdatedAt(Timestamp.valueOf(now));
        return expenseRepository.save(expense);
    }

    // Get all expenses
    public List<Expense> getUserExpense(User user) {
        return expenseRepository.findByUser(user);
    }

    public List<Expense> getExpensesByCategory(Category category) {
        return expenseRepository.findByCategory(category);
    }

    public List<Expense> getUserExpensesByCategory(User user, Category category) {
        return expenseRepository.findByUserAndCategory(user, category);
    }

}
