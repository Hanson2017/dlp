module.exports = {

    // 主要给评级比较用
    bar1(xdata, data) {

        /**/
        var option = {
            tooltip: {},
            calculable: true,
            grid: {
                borderWidth: 0,
                x: 10,
                x2: 0,
                y: 30,
                y2: 0
            },
            xAxis: [
                {
                    type: 'category',
                    show: false,
                    data: xdata
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    show: false
                }
            ],
            series: [
                {
                    name: '评级比较',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            // color: function (params) {
                            //     var colorList = [
                            //         '#2da9d7', '#ccc', '#ccc', '#ccc'
                            //     ];
                            //     return colorList[params.dataIndex]
                            // },
                            label: {
                                show: true,
                                position: 'top',
                                formatter: '{b}\n{c}'
                            }
                        }
                    },
                    data: data
                }
            ]

        };
        return option;
    }


}