package com.example.expense_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


// allow frontend to access this controller
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    String[] names = {"Amrin", "Misaki", "Kaguya"};

    @Autowired
    private UserService userService;

    @RequestMapping("/users")
    public String[] getUsers() {
        return names;
    }

    @GetMapping("/register")
    public String showRegistrationForm() {
        return "register.html";
    }

    @PostMapping("/register")
    @ResponseBody
    public String registerUser(@RequestParam String name, @RequestParam String username, @RequestParam String password) {
        User user = new User();
        user.setName(name);
        user.setUsername(username);
        user.setPassword(password);
        userService.save(user);
        return "Registration successful. You can now <a href='/login.html'>login</a>.";
    }

    @GetMapping("/login")
    public String showLoginForm() {
        return "login.html";
    }

    @PostMapping("/login")
    @ResponseBody
    public String loginUser(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return "Login successful. Welcome, " + user.getName() + "!";
        }
        return "Invalid username or password. Please try again.";
    }
}