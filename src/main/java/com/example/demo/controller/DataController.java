package com.example.demo.controller;

import com.example.demo.domain.Toilets;
import com.example.demo.repository.ToiletsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataController {

    @Autowired
    private ToiletsRepository toiletsRepository;

    @GetMapping("/markers")
    public List<Toilets> getToilets() {
        return toiletsRepository.listToilets();
    }
}
