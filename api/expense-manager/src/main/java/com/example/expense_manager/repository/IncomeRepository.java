package com.example.expense_manager.repository;

import com.example.expense_manager.entity.Income;
import com.example.expense_manager.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUser(User user);

}
