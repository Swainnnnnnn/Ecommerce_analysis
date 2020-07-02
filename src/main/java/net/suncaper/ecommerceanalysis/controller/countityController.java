package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@Controller
public class countityController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/countity_wk")
    @ResponseBody
    public ArrayList<Map<String,Object>> countity_wk1(){
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("SELECT * FROM ads_continuity_wk_count order by dt;");
    }
}
