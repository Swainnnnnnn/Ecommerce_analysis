$(document).ready(function () {
    var Usereta = new Vue({
        el:"#Funnel_user_etabc",
        mounted:function () {
            var myChart = echarts.init(document.getElementById('Funnel_user_etabc'));
            var option = {
                title: {
                    text: '用户的浏览下单情况比率'
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
                    }
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
                        gt: 0,
                        lte: 0.04,
                        color: '#096'
                    }, {
                        gt: 0.04,
                        lte: 0.05,
                        color: '#ffde33'
                    },{
                        gt: 0.05,
                        lte: 0.06,
                        color: '#cc0033'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: {
                    name: '用户的浏览下单情况分析曲线',
                    type: 'line',
                    data:[],
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 0.04
                        }, {
                            yAxis: 0.05
                        },{
                            yAxis: 0.06
                        }
                        ]
                    }
                }
            }
            myChart.showLoading();
            $.ajax({
                type:"get",
                url:"/BuyClick",
                dataType: "json",
                success:function (response) {
                    option.series.data = [];
                    option.xAxis.data = [];
                    for(let i = 0; i < response.length; i++){
                        if(response[i].date_info == "2020-01-01" || response[i].date_info == "2020-01-02"){
                        //    非指定日期
                        }else{
                            option.series.data.push(response[i].rate_buyFromclick);
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