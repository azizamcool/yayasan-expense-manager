package com.example.expense_manager.service;

import com.example.expense_manager.entity.Budget;
import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    // Save new budget
    public Budget save(Budget budget) {
        LocalDateTime now = LocalDateTime.now();
        budget.setCreatedAt(Timestamp.valueOf(now));
        budget.setUpdatedAt(Timestamp.valueOf(now));
        return budgetRepository.save(budget);
    }

    // Get budgets by user
    public List<Budget> getBudgetsByUser(User user) {
        return budgetRepository.findByUser(user);
    }

    public List<Budget> getBudgetsByCategoryAndUser(User user, Category category) {
        return budgetRepository.findByCategoryAndUser(user, category);
    }

    public List<Budget> getAllBudgets() {
        return budgetRepository.findAll();
    }
}
