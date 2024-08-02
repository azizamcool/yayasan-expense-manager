package com.example.expense_manager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Category, Long> {
}
