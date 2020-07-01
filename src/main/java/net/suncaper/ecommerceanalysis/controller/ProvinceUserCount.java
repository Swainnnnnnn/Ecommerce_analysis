package net.suncaper.ecommerceanalysis.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class ProvinceUserCount {
    @Autowired //2. 注入一个jdbcTemplate，完成SQL 增删改查
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/province-user-count") //1. URL映射：映射URL地址 -> getWeekReport
    @ResponseBody //4. 返回JSON数据
    public List<Map<String, Object>> getActThreeDayUser() {
        // 3. 使用JDBC template 执行一段SQL并返回数据
        return jdbcTemplate.queryForList("SELECT * FROM dws_uv_province_total_user");
        // 把数据返回
    }
}
