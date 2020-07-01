//在页面元素加载好之后执行
$(function () {
    var newusers_day_temp = new Vue({
        el:"#activeusers_daily",

        mounted:function () {            //AJAX操作不需要刷新浏览器
            console.log("daily_user_active:")
            var myChart = echarts.init(document.getElementById('activeusers_daily'));

            $.ajax({
                type: "post", //获取数据的HTTP方法，get post head delete
                url: "/GetActiveUsers_Day", //从哪个URL地址获取数据
                dataType: "json",

                success: function (data) { //成功后的回调
                    var dateList=[];
                    var valueList=[];
                    for (var i = 0; i < data.length; i++) {
                        dateList.push(data[i]['dt']);
                        valueList.push(data[i]['count(*)']);
                    }
                    option = {
                        // Make gradient line here
                        visualMap: [{
                            top: 30,
                            right: 30,
                            pieces: [{
                                gt: 0,
                                lte: 5000,
                                color: '#e2be76'
                            }, {
                                gt: 5000,
                                lte: 15000,
                                color: '#e2862d'
                            },{
                                gt: 15000,
                                color: '#cc0033'
                            }],
                        }],

                        title: {
                            left: 'center',
                            text: '每日活跃用户报告'
                        },

                        tooltip : {
                            trigger: 'axis',
                            formatter:function(params){
                                return dateList[params[0].dataIndex]+"</br>"+
                                    "活跃用户数 :"+params[0].value;
                            }
                        },
                        xAxis: {
                            data: dateList
                        },
                        yAxis: {
                            splitLine: {show: false}
                        },
                        grid: {
                            bottom: '10%'
                        },
                        legend: {
                            data: ['每日活跃用户数']
                        },
                        series: [{
                            type: 'line',
                            showSymbol: false,
                            data: valueList,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                            // itemStyle : {
                            //     normal : {
                            //         color:'#253A5D', //改变折线点的颜色
                            //         lineStyle:{
                            //             color:'#3086b5' //改变折线颜色
                            //         }
                            //     }
                            // },
                        }]
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                },
                error: function (data) { //如果失败，进入error
                    console.log(data);
                }
            })

        }

        });
});