$(document).ready(function () {
    var LostUser_Element_Model = new Vue({
        el: "#base_data",
        mounted: function () {
            console.log("base_data")
            //挂载后就加载图表 只加载一次

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