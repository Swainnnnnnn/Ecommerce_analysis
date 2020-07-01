$(function () {
    var newusers_month_temp = new Vue({
        el:"#newusers_month",

        mounted:function () {            //AJAX操作不需要刷新浏览器
            console.log("month_user_add:")
            var myChart = echarts.init(document.getElementById('newusers_month'));

            $.ajax({
                type: 'post',
                url: '/GetNewUsers_Month',
                success: function (data) {
                    console.log(data);
                    var months = [];
                    var totals = [];
                    for (var i = 0; i < data.length; i++) {
                        months.push(data[i]['month']);
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
                            text: '每月新增用户报告'
                        },
                        toolbox: {
                            feature: {
                                magicType: {show: true, type: ['line']},
                                restore: {show: true},
                            }
                        },
                        legend: {
                            data: ['每月增加用户柱形图', '每月增加用户折线图']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                name: '月份',
                                data: months,//月份
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '用户人数',
                                axisLabel: {
                                    formatter: '{value} 人'
                                }
                            }, {
                                type: 'value',
                                // name: '用户人数',
                                axisLabel: {
                                    formatter: '{value} 人'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '每月增加用户数-柱',
                                type: 'bar',
                                data: totals,//人数
                                itemStyle: {
                                    normal: {
                                        //这里是重点
                                        color: function(params) {
                                            var colorList = ['#c23531','#2f4554','#61a0a8','#d48265','#91c7ae','#749f83','#ca8622'];
                                            return colorList[params.dataIndex]
                                        }
                                    }
                                }
                            },
                            {
                                name: '每月增加用户数-折线',
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
                                            color:'#e2862d' //改变折线颜色
                                        }
                                    }
                                },
                            },
                        ]
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