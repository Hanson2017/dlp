module.exports = {
    pieFund(data) {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: '投资平台',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: data
                }
            ]
        };
        return option;
    }

}