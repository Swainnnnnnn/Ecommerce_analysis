package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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

    /***************************1.双十一统计 2.男女购买商品比例统计*******************************************/
    @PostMapping("/GetUserg/shopping11")
    //统计双十一购物总人数
    public ArrayList<Map<String,Object>> userShopping(){
        ArrayList<Map<String,Object>> list = new ArrayList<>();
        //双十一购物总人数 不计性别
        Map<String,Object> obj=(Map<String,Object>)jdbcTemplate.queryForList("select count(*) from ads_ug_count where dt='2020-11-11'").get(0);
        list.add(obj);
        //双十一女性购物人数
        obj=(Map<String,Object>)jdbcTemplate.queryForList("select count(*) from ads_ug_count where gender=0 and dt='2020-11-11'").get(0);
        list.add(obj);
        //双十一男性购物人数
        obj=(Map<String,Object>)jdbcTemplate.queryForList("select count(*) from ads_ug_count where gender=1 and dt='2020-11-11'").get(0);
        list.add(obj);
        //双十一未知性别购物人数
        obj=(Map<String,Object>)jdbcTemplate.queryForList("select count(*) from ads_ug_count where gender<>0 and gender<>1 and dt='2020-11-11'").get(0);
        list.add(obj);
        return list;
    }
    @PostMapping("/GetUserg/shopping")
    //统计男/女购物总商品数
    public ArrayList<Map<String,Object>> ugShopping(){
        return (ArrayList<Map<String, Object>>) jdbcTemplate.queryForList("select * from ads_ug_shopping");
    }

}
