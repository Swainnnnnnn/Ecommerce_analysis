$(document).ready(function () {
    var ActCon = new Vue({
        el:"#Act_continue_3_day",
        mounted:function () {
            var myChart = echarts.init(document.getElementById('Act_continue_3_day'));
            var option = {
                title: {
                    text: '最近七天内，连续活跃三天的用户数'
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
                    name: '最近七天内，连续活跃三天的用户数',
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
                url:"/continue-3-day",
                success:function (response) {
                    option.series.data = [];
                    option.xAxis.data = [];
                    for(let i = 0; i < response.length; i++){
                        if(response[i].dt == "2020-01-01" || response[i].dt == "2020-01-02"){

                        }else{
                            option.series.data.push(response[i].total);
                            option.xAxis.data.push(response[i].dt);
                        }
                    }
                    console.log("get data from dws_uv_detail_c3");
                    // console.log(response)
                    // console.log(option.series.data)
                    // console.log(option.xAxis.data)
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            })

        }
    })

})