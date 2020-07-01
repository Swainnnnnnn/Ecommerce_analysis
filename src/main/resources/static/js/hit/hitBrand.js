$(document).ready(function () {
    var ActCon = new Vue({
        el: "#hit_brand",
        mounted: function () {
            var myChart = echarts.init(document.getElementById('hit_brand'));
            var option = {
                title: {
                    text: '品牌销量前十',
                    left: 'center'
                },
                xAxis: {
                    name: '品牌ID',
                    type: 'category',
                    data: []
                },
                yAxis: {
                    name: '销售量',
                    type: 'value'
                },
                series: [{
                    data: [],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
            };
            myChart.showLoading();
            $.ajax({
                type:"get",
                url:"/hit-brand",
                success:function (response) {
                    option.series[0].data = [];
                    option.xAxis.data = [];
                    for(let i = 0; i < response.length; i++){
                        option.series[0].data.push(response[i].total);
                        option.xAxis.data.push(response[i].brand_id);
                    }
                    console.log("get data from dws_uv_brand_total");
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