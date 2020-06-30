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
public class NewUsersController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/GetNewUsers_Day")
    public List<Map<String,Object>> DailyNewUsers(){
//        System.out.println("统计每日新增用户");
        return jdbcTemplate.queryForList("SELECT count(*),dt FROM dws_useradd_detail_day group by dt order by dt;");
    }

    @PostMapping("/GetNewUsers_Wk")
    public List<Map<String,Object>> WkNewUsers(){
//        System.out.println("统计每周新增用户");
        return jdbcTemplate.queryForList("SELECT * FROM dws_useradd_detail_wk order by wk_num;");
    }

    @PostMapping("/GetNewUsers_Month")
    public List<Map<String,Object>> MonthNewUsers(){
//        System.out.println("统计每月新增用户");
        return jdbcTemplate.queryForList("SELECT * FROM dws_useradd_detail_month order by month;");
    }
}
