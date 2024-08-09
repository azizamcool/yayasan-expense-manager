package com.example.expense_manager.service;

import com.example.expense_manager.entity.Income;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.repository.IncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class IncomeService {

    @Autowired
    private IncomeRepository incomeRepository;

    public Income save(Income income) {
        LocalDateTime now = LocalDateTime.now();

        income.setCreatedAt(Timestamp.valueOf(now));
        income.setUpdatedAt(Timestamp.valueOf(now));
        return incomeRepository.save(income);
    }

    // Get all Income
    public List<Income> getUserIncome(User user) {
        return incomeRepository.findByUser(user);
    }

}
