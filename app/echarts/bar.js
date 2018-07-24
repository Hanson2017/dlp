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
    },
    // 主要给健康度指标
    bar2(title,name, xdata, data, x) {
        /**/
        var option = {
            title: {
                x: 'left',
                text: title,
                textStyle: {
                    color: '#999',
                    fontSize: '12',
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑'

                }
            },
            tooltip: {},
            calculable: true,
            grid: {
                borderWidth: 0,
                x: x,
                x2: 20,
                y: 32,
                y2: 40
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        rotate: 30,
                        textStyle: {
                            color: '#777'
                        }
                    },
                    axisLine: {
                        show: true,

                        lineStyle: {
                            color: '#a0cdfa',
                            width: 1,
                            type: 'solid'
                        }

                    },
                    axisTick: {

                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    data: xdata
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitNumber: 3,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#999',
                            width: 1,
                            type: 'solid'
                        }

                    }

                }
            ],
            series: [
                {
                    name: name,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#a0cdfa'
                        }
                    },
                    data: data
                }
            ]

        };
        return option;
    },
    // 主要给总览资金流
    bar3(title,name, xdata, data, x) {
        /**/
        var option = {
            
            tooltip: {},
            calculable: true,
            grid: {
                borderWidth: 0,
                x: 1,
                x2: 20,
                y: 5,
                y2: 2
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        rotate: 30,
                        textStyle: {
                            color: '#777'
                        }
                    },
                    axisLine: {
                        show: true,

                        lineStyle: {
                            color: '#a0cdfa',
                            width: 1,
                            type: 'solid'
                        }

                    },
                    axisTick: {

                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    data: xdata
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    splitNumber: 3,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#999',
                            width: 1,
                            type: 'solid'
                        }

                    }

                }
            ],
            series: [
                {
                    name: name,
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#a0cdfa'
                        }
                    },
                    data: data
                }
            ]

        };
        return option;
    }


}