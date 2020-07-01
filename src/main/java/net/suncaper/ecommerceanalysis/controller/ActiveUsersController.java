package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class ActiveUsersController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/GetActiveUsers_Day")
    public List<Map<String,Object>> DailyNewUsers(){
        return jdbcTemplate.queryForList("SELECT count(*),dt FROM dws_uv_detail_day group by dt order by dt;");
    }

    @PostMapping("/GetActiveUsers_Wk")
    public List<Map<String,Object>> WkNewUsers(){
        return jdbcTemplate.queryForList("SELECT * FROM dws_uv_detail_wk order by wk_num;");
    }

    @PostMapping("/GetActiveUsers_Month")
    public List<Map<String,Object>> MonthNewUsers(){
        return jdbcTemplate.queryForList("SELECT * FROM dws_uv_detail_month order by month;");
    }
}
