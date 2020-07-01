$(document).ready(function () {
    var LostUser_Element_Model = new Vue({
        el: "#base_data_holder",
        data:{
            tableData:[]
        },
        mounted: function () {
            console.log("base_data")
            //挂载后就加载图表 只加载一次
            var myChart = echarts.init(document.getElementById('base_data'));
            var option = {
                title: {
                    text: '用户年龄段分布'
                },
                tooltip: {},
                legend: {
                    data: ['当日用户流失量']
                },
                xAxis: {
                    data: ["未知", "<18", "[18,24]", "[25,29]", "[30,34]", "[35,39]","[40,49]",">=50"]
                },
                yAxis: {
                    min: 'dataMin'
                },

                series: [{
                    name: '年龄段',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20],  itemStyle: {
                        normal: {
                            //这里是重点
                            color: function(params) {
                                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                                if(params.dataIndex%2==0)
                                    return '#21a0a8'
                                else
                                    return '#e48265'
                            }
                        }
                    }
                }]
            };


            myChart.showLoading(); // 开启 loading 效果
            var that = this.tableData
            $.ajax({
                type: "post",
                url: "/GetBaseData",

                dataType: "json",
                success: function (response) {
                    console.log(response);
                    console.log(  response[0].num);
                    var t= {shop:0,brand:0,volume:0};
                    t.shop = response[0].num;
                    t.brand= response[1].num;
                    t.volume = response[2].num;
                    that.push(t);




                }
            });
            $.ajax({
                type: "post",
                url: "/GetAgeDistribution",

                dataType: "json",
                success: function (response) {
                    console.log(response);
                    option.series[0].data = [];

                    for (let index = 0; index < response.length; index++) {
                        const element = response[index];
                        option.series[0].data.push(element.num);

                    }
                    myChart.hideLoading(); // 隐藏 loading 效果
                    myChart.setOption(option);


                }
            });
        },
        methods: {}
    });


});