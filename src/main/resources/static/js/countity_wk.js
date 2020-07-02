$(document).ready(function () {
    var countity = new Vue({
        el:"#countity_wk",
        mounted:function () {
            var myChart = echarts.init(document.getElementById('countity_wk'));
            var option = {
                title: {
                    text: '最近三周的活跃数'
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
                    startValue: '2014-05-01'
                }, {
                    type: 'inside'
                }],
                visualMap: {
                    top: 10,
                    right: 10,
                    pieces: [{
                        gt: 0,
                        lte: 5000,
                        color: '#096'
                    }, {
                        gt: 5000,
                        lte: 10000,
                        color: '#ffde33'
                    },{
                        gt: 10000,
                        lte: 30000,
                        color: '#cc0033'
                    },{
                        gt: 30000,
                        color: '#7e0023'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: {
                    name: '最近三周的活跃数',
                    type: 'line',
                    data:[],
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 5000
                        }, {
                            yAxis: 10000
                        },{
                            yAxis: 30000
                        },{
                            yAxis: 60000
                        }
                        ]
                    }
                }
            }
            myChart.showLoading();
            $.ajax({
                type:"get",
                url:"/countity_wk",
                success:function (response) {
                    option.series.data = [];
                    option.xAxis.data = [];
                    for(let i = 0; i < response.length; i++){
                        if(response[i].dt == "2020-01-01" || response[i].dt == "2020-01-02"){

                        }else{
                            option.series.data.push(response[i].continuity_count);
                            option.xAxis.data.push(response[i].wk_dt);
                        }
                    }
                    console.log("get data from ads_continuity_wk_count");
                    console.log(response)
                    console.log(option.series.data)
                    console.log(option.xAxis.data)
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            })

        }
    })

})