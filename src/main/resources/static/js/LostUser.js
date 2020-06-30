$(document).ready(function () {
    var LostUser_Element_Model = new Vue({
        el: "#Lost_user_table",
        mounted: function () {
            console.log("Lost_user_table")
            //挂载后就加载图表 只加载一次
            var myChart = echarts.init(document.getElementById('Lost_user_table'));
            /*var option = {
                title: {
                    text: '用户流失情况'
                },
                tooltip: {},
                legend: {
                    data: ['当日用户流失量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                dataZoom: {//实现缩放功能
                    show: true, realtime: true, start: 0, end: 70
                },
                series: [{
                    name: '当日用户流失量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };*/

            var option = {
                title: {
                    text: '用户流失情况'
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
                        lte: 1000,
                        color: '#096'
                    }, {
                        gt: 1000,
                        lte: 3000,
                        color: '#ffde33'
                    },{
                        gt: 3000,
                        lte: 5000,
                        color: '#cc0033'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                series: {
                    name: '当日流失用户数',
                    type: 'line',
                    data:[],
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 5000
                        }, {
                            yAxis: 1000
                        },{
                            yAxis: 3000
                        }
                        ]
                    }
                }
            }
            myChart.showLoading(); // 开启 loading 效果
            $.ajax({
                type: "post",
                url: "/GetLostUser",

                dataType: "json",
                success: function (response) {
                    console.log(response);
                    option.series.data = [];
                    option.xAxis.data = [];
                    for (let index = 0; index < response.length; index++) {
                        const element = response[index];
                        option.series.data.push(element.total);
                        option.xAxis.data.push(element.dt);
                    }
                    myChart.hideLoading(); // 隐藏 loading 效果
                    myChart.setOption(option);


                }
            });
        },
        methods: {}
    });


});