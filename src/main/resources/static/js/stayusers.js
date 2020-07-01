//在页面元素加载好之后执行
$(function () {
    var stayusers_day_temp = new Vue({
        el:"#stayusers_daily",

        mounted:function () {            //AJAX操作不需要刷新浏览器
            console.log("daily_user_stay:")
            var myChart = echarts.init(document.getElementById('stayusers_daily'));

            $.ajax({
                type: "post", //获取数据的HTTP方法，get post head delete
                url: "/GetStayUsers", //从哪个URL地址获取数据
                dataType: "json",

                success:function (data) {
                    console.log(data);
                    var dts=[];
                    var day1=[];//1天留存率
                    var day2=[];//2天留存率
                    var day3=[];//3天留存率
                    var day4=[];//4天留存率
                    var day7=[];//7天留存率
                    var day14=[];//14天留存率

                    for(var i=0;i< data.length;i++){
                        dts.push(data[i].dt);
                        day1.push(data[i]['day1'].substring(0,data[i]['day1'].indexOf("%")));
                        day2.push(data[i]['day2'].substring(0,data[i]['day2'].indexOf("%")));
                        day3.push(data[i]['day3'].substring(0,data[i]['day3'].indexOf("%")));
                        day4.push(data[i]['day4'].substring(0,data[i]['day4'].indexOf("%")));
                        day7.push(data[i]['day7'].substring(0,data[i]['day7'].indexOf("%")));
                        day14.push(data[i]['day14'].substring(0,data[i]['day14'].indexOf("%")));
                    }

                    option = {
                        title: {
                            text: '用户留存率'
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data: ['1天后', '2天后', '3天后', '4天后', '7天后','14天后']
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: dts//日期dt
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                min:0.00,
                                max:200.00
                            }
                        ],
                        series: [
                            {
                                name: '1天后',
                                type: 'line',
                                stack: '留存率%',
                                areaStyle: {},
                                data: day1//留存率
                            },
                            {
                                name: '2天后',
                                type: 'line',
                                stack: '留存率%',
                                areaStyle: {},
                                data: day2
                            },
                            {
                                name: '3天后',
                                type: 'line',
                                stack: '留存率%',
                                areaStyle: {},
                                data: day3
                            },
                            {
                                name: '4天后',
                                type: 'line',
                                stack: '留存率%',
                                areaStyle: {},
                                data: day4
                            },
                            {
                                name: '7天后',
                                type: 'line',
                                stack: '留存率%',
                                areaStyle: {},
                                data: day7
                            },
                            {
                                name: '14天后',
                                type: 'line',
                                stack: '留存率%',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                areaStyle: {},
                                data: day14,
                                markLine: {
                                    silent: true,
                                    data: [{
                                        yAxis: 5.00
                                    }, {
                                        yAxis: 20.00
                                    },{
                                        yAxis: 80.00
                                    }
                                    ]
                                },
                            }
                        ]
                    };//option

                    myChart.setOption(option);
                },//success


                error: function (data) { //如果失败，进入error
                    console.log(data);
                }
            })

        }

    });
});