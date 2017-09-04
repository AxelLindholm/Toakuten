package com.example.demo.controller;

import com.example.demo.repository.getToiletsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * Created by Administrator on 2017-09-04.
 */
@Controller
public class toiletController {

    @Autowired
    private getToiletsRepository toiletRepository;
}
