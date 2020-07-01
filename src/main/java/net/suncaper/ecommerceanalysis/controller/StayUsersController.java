package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class StayUsersController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/GetStayUsers")
    public List<Map<String,Object>> DailyStayUsers(){
        return jdbcTemplate.queryForList("SELECT * FROM dws_userstay_detail_day order by dt;");
    }
}
