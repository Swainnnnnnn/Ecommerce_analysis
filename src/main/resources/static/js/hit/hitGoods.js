$(document).ready(function () {
    var ActCon = new Vue({
        el: "#hit_goods",
        mounted: function () {
            var myChart = echarts.init(document.getElementById('hit_goods'));
            var option = {
                title: {
                    text: '商品销售前十',
                    left: 'center'
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '15%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        name: '商品ID',
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        name: '销量',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            };
            myChart.showLoading();
            $.ajax({
                type:"get",
                url:"/hit-goods",
                success:function (response) {
                    option.series[0].data = [];
                    option.xAxis[0].data = [];
                    for(let i = 0; i < response.length; i++){
                        option.series[0].data.push(response[i].total);
                        option.xAxis[0].data.push(response[i].item_id);
                    }
                    console.log("get data from dws_uv_goods_total");
                    // console.log(response)
                    // console.log(option.series.data)
                    // console.log(option.xAxis.data)
                    myChart.hideLoading();
                    myChart.setOption(option);
                }
            });
        }
    })
})