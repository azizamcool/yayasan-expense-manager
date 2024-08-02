package com.example.expense_manager;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Category, Long> {
}
