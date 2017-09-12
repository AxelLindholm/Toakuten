package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ToiletController {
    //Woho
    @GetMapping("/")
    public ModelAndView Index() {
        return new ModelAndView("index");
    }

    @GetMapping("/map")
    public ModelAndView Googlemaps() {
        return new ModelAndView("Googlemaps");
    }
}
