package com.example.expense_manager.controller;


import com.example.expense_manager.entity.Expense;
import com.example.expense_manager.entity.Income;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.service.IncomeService;
import com.example.expense_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
public class IncomeController {

    @Autowired
    private IncomeService incomeService;

    @Autowired
    private UserService userService;


    @PostMapping("/income")
    @ResponseBody
    public String createIncome(@RequestParam String username, @RequestParam BigDecimal amount,
                                @RequestParam  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate incomeDate,
                                @RequestParam(required = false) String notes,
                                @RequestParam(required = false) String imageUrl) {

        User user = userService.findByUsername(username);

        Income income = new Income();
        income.setUser(user);
        income.setAmount(amount);
        income.setCurrency("MYR");
        income.setIncomeDate(incomeDate);
        income.setNotes(notes);
        income.setImageUrl(imageUrl);
        System.out.println("Ini NAMANYA " + user);

        incomeService.save(income);
        return "Income RM : " + income.getAmount() + " updated!";
    }

    //verify
    @GetMapping("/getIncome")
    public ResponseEntity<List<Income>> getAllIncome(@RequestParam String username) {

        User user = userService.findByUsername(username);
        return ResponseEntity.ok(incomeService.getUserIncome(user));
    }

    @PutMapping("/updateIncomeWithExchangeRate")
    public ResponseEntity<String> updateIncomeWithExchangeRate(@RequestParam String username, @RequestParam BigDecimal exchangeRate) {
        User user = userService.findByUsername(username);

        // Fetch all expenses for the user
        List<Income> incomes = incomeService.getUserIncome(user);

        for (Income income : incomes) {
            BigDecimal originalAmount = income.getAmount();
            BigDecimal convertedAmount = originalAmount.multiply(exchangeRate);

            income.setAmount(convertedAmount);
            incomeService.save(income); // Save the updated expense
        }

        return ResponseEntity.ok("Expenses updated with the exchange rate of " + exchangeRate);
    }
}
