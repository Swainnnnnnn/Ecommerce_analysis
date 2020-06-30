package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Map;

@Controller
public class FunnelUser {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // 下单次数浏览次数浏览次数的比率
    @GetMapping("/BuyClick")
    @ResponseBody
    public ArrayList<Map<String, Object>> BacUserbc() {
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("SELECT date_info,rate_buyFromclick FROM dws_eta_buyaddclick_user;");
    }

    @GetMapping("/BuyAdd")
    @ResponseBody
    public ArrayList<Map<String, Object>> BacUserba() {
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("SELECT date_info,rate_buyFromaddtrolley FROM dws_eta_buyaddclick_user;");
    }
}
