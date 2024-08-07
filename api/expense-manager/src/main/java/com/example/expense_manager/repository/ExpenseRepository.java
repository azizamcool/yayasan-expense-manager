package com.example.expense_manager.repository;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
        List<Expense> findByUser(User user);
        List<Expense> findByCategory(Category category);
        List<Expense> findByUserAndCategory(User user, Category category);
}