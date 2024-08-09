package com.example.expense_manager.repository;

import com.example.expense_manager.entity.Budget;
import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findByUser(User user);
    List<Budget> findByCategoryAndUser(User user, Category category);
}