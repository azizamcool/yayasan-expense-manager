package com.example.expense_manager.service;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    //Simpan new category
    public Category save(Category category){
        LocalDateTime now = LocalDateTime.now();
        category.setCreatedAt(Timestamp.valueOf(now));
        category.setUpdatedAt(Timestamp.valueOf(now));
        return categoryRepository.save(category);
    }

    //dapatkan semua category
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public List<Category> getUserCategory(User user) {
        return categoryRepository.findByUser(user);
    }
}