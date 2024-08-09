package com.example.expense_manager.controller;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.service.CategoryService;
import com.example.expense_manager.service.ExpenseService;
import com.example.expense_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.WeakHashMap;

@RestController
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryService categoryService;

    //Verify
    @PostMapping("/expense")
    @ResponseBody
    public String createExpense(@RequestParam String username, @RequestParam BigDecimal amount,
                                @RequestParam Long categoryId,  @RequestParam(required = false) String notes,
                                @RequestParam(required = false) String imageUrl) {

        User user = userService.findByUsername(username);
        Category category = categoryService.findById(categoryId);

        Expense expense = new Expense();
        expense.setUser(user);
        expense.setAmount(amount);
        expense.setCurrency("MYR");
        expense.setCategory(category);
        expense.setNotes(notes);
        expense.setImageUrl(imageUrl);

        expenseService.save(expense);
        return "Expense " +expense.getCategory().getName() + " , RM : " + expense.getAmount() + " save!";
    }

    //verify
    @GetMapping("/getExpense")
    public ResponseEntity<List<Expense>> getAllExpense(@RequestParam String username) {

        User user = userService.findByUsername(username);
        return ResponseEntity.ok(expenseService.getUserExpense(user));
    }

    //verify
    @GetMapping("/getExpenseByCategory")
    public ResponseEntity<List<Expense>> getExpenseCategory(@RequestParam long categoryId){
        Category categoryEx = categoryService.findById(categoryId);
        List<Expense> expenses = expenseService.getExpensesByCategory(categoryEx);
        return ResponseEntity.ok(expenses);
    }

    @GetMapping("/getUserExpenseByCategory")
    public ResponseEntity<List<Expense>> getUserExpenseCategory(@RequestParam String username,@RequestParam long categoryId){
        User userEd = userService.findByUsername(username);
        Category categoryEd = categoryService.findById(categoryId);
        List<Expense> expensesEd = expenseService.getUserExpensesByCategory(userEd, categoryEd);
        return ResponseEntity.ok(expensesEd);
    }

    @PutMapping("/updateExpensesWithExchangeRate")
    public ResponseEntity<String> updateExpensesWithExchangeRate(@RequestParam String username, @RequestParam BigDecimal exchangeRate) {
        User user = userService.findByUsername(username);

        // Fetch all expenses for the user
        List<Expense> expenses = expenseService.getUserExpense(user);

        for (Expense expense : expenses) {
            BigDecimal originalAmount = expense.getAmount();
            BigDecimal convertedAmount = originalAmount.multiply(exchangeRate);

            expense.setAmount(convertedAmount);
            expenseService.save(expense); // Save the updated expense
        }

        return ResponseEntity.ok("Expenses updated with the exchange rate of " + exchangeRate);
    }
}