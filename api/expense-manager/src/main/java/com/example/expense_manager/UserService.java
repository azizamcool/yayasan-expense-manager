package com.example.expense_manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
