$(document).ready(function () {
    var ActCon = new Vue({
        el: "#province_goods_count",
        mounted: function () {
            var myChart = echarts.init(document.getElementById('province_goods_count'));

            myChart.showLoading();
            $.ajax({
                type:"get",
                url:"/province-goods-count",
                success:function (response) {

                    var dataAxis = [];
                    var data = [];
                    var yMax = 500;
                    var dataShadow = [];

                    for(let i = 0; i < response.length; i++){
                        data.push(response[i].total);
                        dataAxis.push(response[i].province);
                    }

                    // for (var i = 0; i < data.length; i++) {
                    //     dataShadow.push(yMax);
                    // }
                    option = {
                        title: {
                            text: '各省份购买量',
                        },
                        xAxis: {
                            name: '省份',
                            data: dataAxis,
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false
                            },
                            z: 10
                        },
                        yAxis: {
                            min: 'dataMin',
                            name: '购买商品数量',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#999'
                                }
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside'
                            }
                        ],
                        series: [
                            { // For shadow
                                type: 'bar',
                                itemStyle: {
                                    color: 'rgba(0,0,0,0.05)'
                                },
                                barGap: '-100%',
                                barCategoryGap: '40%',
                                data: dataShadow,
                                animation: false
                            },
                            {
                                type: 'bar',
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    itemStyle: {
                                        color: new echarts.graphic.LinearGradient(
                                            0, 0, 0, 1,
                                            [
                                                {offset: 0, color: '#2378f7'},
                                                {offset: 0.7, color: '#2378f7'},
                                                {offset: 1, color: '#83bff6'}
                                            ]
                                        )
                                    }
                                },
                                data: data
                            }
                        ]
                    };
                    // Enable data zoom when user click bar.
                    var zoomSize = 6;
                    myChart.on('click', function (params) {
                        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
                        myChart.dispatchAction({
                            type: 'dataZoom',
                            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
                        });
                    });
                    console.log("get data from dws_uv_province_total_goods");
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