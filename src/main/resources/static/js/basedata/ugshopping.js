//在页面元素加载好之后执行
$(function () {
    var ug_shopping_temp = new Vue({
        el:"#ug_shopping",//男女用户购买商品的总数

        mounted:function () {            //AJAX操作不需要刷新浏览器
            // console.log("ug_shopping:");
            var myChart = echarts.init(document.getElementById('ug_shopping'));

            $.ajax({
                type: "post", //获取数据的HTTP方法，get post head delete
                url: "/GetUserg/shopping", //获取女性用户总数量
                dataType: "json",

                success:function (data) {
                    // console.log(data);
                    var gender=[];//性别
                    var total=[];//购物总数
                    for(var i=0;i< data.length;i++){
                        gender.push(data[i].gender);
                        total.push((data[i].total));
                    }

                    option = {
                        backgroundColor: '#2c343c',
                        title: {
                            text: '男:女性用户购买商品比例'+'    '+(total[0]/total[1]).toString().substring(0,5),
                            left: 'center',
                            top: 20,
                            textStyle: {
                                color: '#ccc'
                            }
                        },

                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        series: [
                            {
                                name: '购买商品总数',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '50%'],
                                data: [
                                    {value: total[0], name: 'gender: '+gender[0]+' 男性购买商品总数',itemStyle:{color:'#61a0a8'}},
                                    {value: total[1], name: 'gender: '+gender[1]+'女性购买商品总数',itemStyle:{color:'#d48265'}},
                                ].sort(function (a, b) { return a.value - b.value; }),//购买商品总数
                                roseType: 'radius',
                                label: {
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                labelLine: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                },
                                itemStyle: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },

                                animationType: 'scale',
                                animationEasing: 'elasticOut',
                                animationDelay: function (idx) {
                                    return Math.random() * 200;
                                }
                            }
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