package com.example.expense_manager.repository;

import com.example.expense_manager.entity.Report;
import com.example.expense_manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(User user);
    List<Report> findByType(String type);
}
