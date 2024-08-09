package com.example.expense_manager.service;

import com.example.expense_manager.repository.UserRepository;
import com.example.expense_manager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

//    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//
//    public User save(User user) {
//        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
//        return userRepository.save(user);
//    }

    public User save(User user) {
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(Timestamp.valueOf(now));
        user.setUpdatedAt(Timestamp.valueOf(now));
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}