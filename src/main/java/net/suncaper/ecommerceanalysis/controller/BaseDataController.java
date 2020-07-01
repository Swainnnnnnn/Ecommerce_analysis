package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Map;

@RestController
public class BaseDataController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/GetBaseData")
    public ArrayList<Map<String,Object>>  BaseData(){

        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("select * from  base_data;");
    }
    //age_distribution
    @PostMapping("/GetAgeDistribution")
    public ArrayList<Map<String,Object>> AgeDistribution(){

        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("select * from  age_distribution;");
    }


}
