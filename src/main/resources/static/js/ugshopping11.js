//在页面元素加载好之后执行
$(function () {
    var ug_shopping11_temp = new Vue({
        el:"#ug_shopping11",//双十一购买商品的用户数

        mounted:function () {            //AJAX操作不需要刷新浏览器
            // console.log("ug_shopping11:");
            var myChart = echarts.init(document.getElementById('ug_shopping11'));

            $.ajax({
                type: "post", //获取数据的HTTP方法，get post head delete
                url: "/GetUserg/shopping11", //获取女性用户总数量
                dataType: "json",

                success:function (data) {
                    // console.log(data);
                    var total=[];//双十一购物总人数
                    for(var i=0;i< data.length;i++){
                        total.push((data[i]['count(*)']));
                    }

                    option = {
                        title: {
                            text: '双十一购物商品的用户数',
                            left: 20,
                        },
                        legend: {},
                        tooltip: {},
                        dataset: {
                            dimensions: ['product', '双十一购物总人数', '女性用户', '男性用户','未知用户'],
                            source: [
                                {product: '2020-11-11用户购物情况', '双十一购物总人数': total[0], '女性用户': total[1], '未知用户': total[2],'男性用户': total[3]},
                            ]
                        },
                        xAxis: {type: 'category'},
                        yAxis: {},
                        series: [
                            {type: 'bar',
                             markPoint: {
                                    data: [
                                        {type: 'max', name: '最大值'},
                                    ]
                                },
                            },
                            {type: 'bar'},
                            {type: 'bar'},
                            {type: 'bar'}
                        ]
                    };

                    myChart.setOption(option);
                },//success


                error: function (data) { //如果失败，进入error
                    console.log(data);
                }
            })

        }

    });
});