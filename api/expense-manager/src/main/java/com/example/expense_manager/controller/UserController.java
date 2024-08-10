package com.example.expense_manager.controller;

import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.Income;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.service.ExpenseService;
import com.example.expense_manager.service.IncomeService;
import com.example.expense_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private IncomeService incomeService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    @ResponseBody
    public String registerUser(@RequestParam String username, @RequestParam String password,
                               @RequestParam(required = false) String email) {

        String hashedPassword = passwordEncoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(hashedPassword);
        user.setEmail(email);
        user.setPreferredCurrency("MYR");
        userService.save(user);
        return "Registration successful, WELCOME " + user.getUsername();
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<String> loginUser(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username);
        if (user != null && passwordEncoder.matches(password, user.getPasswordHash())) {
            return ResponseEntity.ok(user.getUsername() + " " + user.getPreferredCurrency());
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    @PutMapping("/updateCurrency")
    public ResponseEntity<String> setCurrency(@RequestParam String username, @RequestParam String currency) {
        User user = userService.findByUsername(username);
        List<Expense> expenses = expenseService.getUserExpense(user);
        List<Income> incomes = incomeService.getUserIncome(user);

        if (user != null) {
            user.setPreferredCurrency(currency);
            userService.save(user);

            if (expenses != null) {
                for (Expense expense : expenses) {
                    expense.setCurrency((currency));
                    expenseService.save(expense);
                }
            }

            if (incomes != null) {
                for (Income income : incomes) {
                    income.setCurrency((currency));
                    incomeService.save(income);
                }
            }

            return ResponseEntity.ok(user.getPreferredCurrency());
        }

        return ResponseEntity.status(404).body("User not found");
    }
}