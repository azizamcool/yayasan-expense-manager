package com.example.expense_manager.repository;

import com.example.expense_manager.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Category, Long> {
}