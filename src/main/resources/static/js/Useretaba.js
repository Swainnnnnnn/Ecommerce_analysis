$(document).ready(function () {
    var Useretaba = new Vue({
        el: "#Funnel_user_etaba",
        mounted: function () {
            var myChart = echarts.init(document.getElementById('Funnel_user_etaba'));
            var option = {
                title: {
                    text: '用户的加购下单情况比率'
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: {
                    data: []
                },
                yAxis: {
                    splitLine: {
                        show: false
                    },
                    type: 'value',
                    min: 0.95,
                    max: 0.99,

                    // max:function (value) {
                    //     return value.max-0.05;
                    // },
                    // min:function (value) {
                    //     return value.min+0.9;
                    // }
                },
                toolbox: {
                    left: 'center',
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    startValue: '2014-06-01'
                }, {
                    type: 'inside'
                }],
                visualMap: {
                    
                    top: 10,
                    right: 10,
                    pieces: [{
                        gt: 0.95,
                        lte: 0.97,
                        color: '#06fb10'
                    }, {
                        gt: 0.97,
                        lte: 0.98,
                        color: '#2e16dd'
                    },{
                        gt: 0.98,
                        lte: 0.985,
                        color: '#e68210'
                    },{
                        gt: 0.985,
                        lte: 0.99,
                        color: '#b811bf'
                    }],
                    outOfRange: {
                        color: '#fd0000'
                    }
                },
                series: {
                    name: '用户的加购下单情况分析曲线',
                    type: 'line',
                    data: [],
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 0.97
                        }, {
                            yAxis: 0.98
                        },{
                            yAxis: 0.985
                        }, {
                            yAxis: 0.99
                        }
                        ]
                    }
                }
            }
            myChart.showLoading();
            $.ajax({
                type: "get",
                url: "/BuyAdd",
                dataType: "json",
                success: function (response) {
                    option.series.data = [];
                    option.xAxis.data = [];
                    for (let i = 0; i < response.length; i++) {
                        if (response[i].date_info == "2020-01-01" || response[i].date_info == "2020-01-02") {
                            //    非指定日期
                        } else {
                            option.series.data.push(response[i].rate_buyFromaddtrolley);
                            option.xAxis.data.push(response[i].date_info);
                        }
                    }
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            })
        }
    })

})