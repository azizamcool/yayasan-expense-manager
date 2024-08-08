package com.example.expense_manager.controller;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.service.CategoryService;
import com.example.expense_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    //verify
    @PostMapping("/category")
    @ResponseBody
    public String createCategory(@RequestParam String categoryName, @RequestParam String username) {
        User user = userService.findByUsername(username);
        Category category = new Category();

        category.setName(categoryName);
        category.setUser(user);
        categoryService.save(category);
        return "Category " +category.getName() + " save!";
    }

    //verify
    @GetMapping("/getCategory")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    //verify but not i think this is not needed
    @GetMapping("/getUserCategory")
    public ResponseEntity<List<Category>> getUserCategory(@RequestParam String username) {

        User user = userService.findByUsername(username);
        return ResponseEntity.ok(categoryService.getUserCategory(user));
    }
}