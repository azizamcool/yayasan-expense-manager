package com.example.expense_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


// allow frontend to access this controller
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    //kena tambah user dan setup currency?
    @PostMapping("/register")
    @ResponseBody
    public String registerUser(@RequestParam String username, @RequestParam String password,
                               @RequestParam(required = false) String email) {
                                //}, @RequestParam(required = false){
                                //   String preferredCurrency) {
        User user = new User();
        //user.setName(name);
        user.setUsername(username);
        user.setPasswordHash(password);
        user.setEmail(email);
        user.setPreferredCurrency("MYR");
        userService.save(user);
        return "Registration successful, WELCOME " + user.getUsername();
    }

    @PostMapping("/login")
    @ResponseBody
    public String loginUser(@RequestParam String username, @RequestParam String password) {
        User user = userService.findByUsername(username);
        if (user != null && user.getPasswordHash().equals(password)) {
            return "Login successful. Welcome, " + user.getUsername() + "!";
        }
        return "Invalid username or password. Please try again.";
    }

}