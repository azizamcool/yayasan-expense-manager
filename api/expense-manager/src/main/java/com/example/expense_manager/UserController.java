package com.example.expense_manager;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

// allow frontend to access this controller
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    String[] names = {"Amrin", "Misaki", "Kaguya"};
    
    @RequestMapping("/users")
    public String[] getUsers() {
        return names;
    }
}