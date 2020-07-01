$(function () {
    var newusers_wk_temp = new Vue({
        el:"#activeusers_wk",

        mounted:function () {            //AJAX操作不需要刷新浏览器
            console.log("wk_user_active:")
            var myChart = echarts.init(document.getElementById('activeusers_wk'));

            $.ajax({
                type: "post",
                url: "/GetActiveUsers_Wk",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    var wk_nums = [];
                    var totals = [];
                    for (var i = 0; i < data.length; i++) {
                        wk_nums.push(data[i]['wk_num']);
                        totals.push(data[i]['total']);
                    }
                    option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                crossStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        title: {
                            left: 'center',
                            text: '每周活跃用户报告'
                        },
                        toolbox: {
                            feature: {
                                magicType: {show: true, type: ['line']},
                                restore: {show: true},
                            }
                        },
                        legend: {
                            data: ['每周活跃用户柱形图', '每周活跃用户折线图']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                name: '周数',
                                data: wk_nums,//周数
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '活跃用户人数',
                                axisLabel: {
                                    formatter: '{value} 人'
                                }
                            }, {
                                type: 'value',
                                axisLabel: {
                                    formatter: '{value} 人'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '每周活跃用户数-柱',
                                type: 'bar',
                                data: totals,//人数
                                itemStyle: {
                                    normal: {
                                        //这里是重点
                                        color: function(params) {
                                            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                            if(params.dataIndex%2==0)
                                                return '#61a0a8'
                                            else
                                                return '#d48265'
                                        }
                                    }
                                }
                            },
                            {
                                name: '每周活跃用户数-折线',
                                type: 'line',
                                data: totals,//人数
                                markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                        {type: 'min', name: '最小值'}
                                    ]
                                },
                                markLine: {
                                    data: [
                                        {type: 'average', name: '平均值'}
                                    ]
                                },
                                itemStyle : {
                                    normal : {
                                        lineStyle:{
                                            color:'#2f4554' //改变折线颜色
                                        }
                                    }
                                },
                            },

                        ],
                    };

                    // 使用刚指定的配置项和数据显示图表。
                    myChart.setOption(option);
                },
                error: function (data) {
                    console.log(data);
                }
            })

        }

    });
});