package com.example.expense_manager.controller;

import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.Report;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.service.ReportService;
import com.example.expense_manager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@RestController
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private UserService userService;

    //verify
    @PostMapping("/createReport")
    @ResponseBody
    public String createReport(@RequestParam String username, @RequestParam String type,
                               @RequestParam Date startDate,
                               @RequestParam Date endDate) {

        User user = userService.findByUsername(username);

        Report report = new Report();
        report.setUser(user);
        report.setType(type);
        report.setStartDate(startDate);
        report.setEndDate(endDate);
        return "Report " + report.getType() + " save!";
    }

    //verify
    @GetMapping("/allReport")
    public ResponseEntity<List<Report>> getAllReport() {
        return ResponseEntity.ok(reportService.getAll());
    }

    //verify
    @GetMapping("/userReport")
    public ResponseEntity<List<Report>> getReportsByUser(@RequestParam String username) {
        User user = userService.findByUsername(username);

        List<Report> report = reportService.findByUserUser(user);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/typeReport")
    public ResponseEntity<List<Report>> getReportByType(@RequestParam String type) {
        List<Report> reportType = reportService.findByType(type);
        return ResponseEntity.ok(reportType);
    }
}