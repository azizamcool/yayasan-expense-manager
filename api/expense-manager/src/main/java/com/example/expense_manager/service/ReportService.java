package com.example.expense_manager.service;

import com.example.expense_manager.entity.Report;
import com.example.expense_manager.entity.Category;
import com.example.expense_manager.entity.User;
import com.example.expense_manager.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    //Simpan new report
    public Report save(Report report){
        LocalDateTime now = LocalDateTime.now();
        report.setGeneratedAt(Timestamp.valueOf(now));
        return reportRepository.save(report);
    }

    //dapatkan semua report
    public List<Report> getAll() {
        return reportRepository.findAll();
    }

    //findreport
    public Report findById(Long id) {
        return reportRepository.findById(id).orElse(null);
    }

    public List<Report> findByUserUser(User user) {
        return reportRepository.findByUser(user);
    }

    public List<Report>  findByType(String type) {
        return reportRepository.findByType(type);
    }
}