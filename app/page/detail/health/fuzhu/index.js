import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';
import DashLine from '../../../../component/dashLine';
import BarChart from '../../../../echarts/bar';


export default class DetailHealthFuzhu extends React.Component {
    color(data) {
        var color;
        if (data.status == '强' || data.status == '偏强' || data.status == '极强') {
            color = '#39B54A';
        }
        else if (data.status == '偏若' || data.status == '正常') {
            color = '#FFA500';
        }
        else {
            color = '#ED1C24';
        }
        return color;
    }
    render() {
        const { data, navigation } = this.props;

        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataLoanPeriod = [] //流动性
            var dataAvgBorrowMoney = []  //分散度
            var dataBidderNum = []     //人气
            var dataStayStillOfTotal = []     //体量
            var dataAvgBidMoney = []  //忠诚度
            var dataBidderWaitNum = []  //成长性
            var dataRate = []   //收益率

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataLoanPeriod.push(data.listdata[i].loanPeriod)
                dataAvgBorrowMoney.push(data.listdata[i].avgBorrowMoney)
                dataBidderNum.push(data.listdata[i].bidderNum)
                dataStayStillOfTotal.push(data.listdata[i].stayStillOfTotal)
                dataAvgBidMoney.push(data.listdata[i].avgBidMoney)
                dataBidderWaitNum.push(data.listdata[i].bidderWaitNum)
                dataRate.push(data.listdata[i].rate)
            }

        }

        if (data.dataDetail != null && data.dataDetail != '') {
            var mobility = data.dataDetail.mobility; //流动性基本信息
            var dispersion = data.dataDetail.dispersion; //分散度基本信息
            var popularity = data.dataDetail.popularity; //人气基本信息
            var stayStill = data.dataDetail.stayStill; //体量基本信息
            var loyalty = data.dataDetail.loyalty; //忠诚度基本信息
            var growth = data.dataDetail.growth; //成长性基本信息
            var rate = data.dataDetail.rate; //收益率基本信息
            var negative = data.dataDetail.negative; //负面信息
        }

        return (
            <View>
                {
                    data.listdata != null && data.listdata.length > 0 ?
                        <ScrollView contentContainerStyle={styles.container}>
                            <View style={[Theme.box]}>
                                <View style={styles.healthTop}>
                                    <Text style={styles.healthTopText}>辅助指标为参考性指标，可辅助判断。</Text>
                                </View>
                                <View style={styles.diagnoseBox}>
                                    <View style={styles.diagnoseHeader}>
                                        <View style={styles.diagnoseHeaderIcon}>
                                            <Icon name={'zb-liudong'} size={55} color={this.color(mobility)} />
                                        </View>
                                        <View style={styles.diagnoseHeaderRight}>
                                            <Text style={styles.titleText}>流动性诊断</Text>
                                            <Text style={styles.diagnoseHeaderText}>{mobility.info}</Text>
                                        </View>

                                    </View>
                                    <DashLine width={Theme.screenWidth - 34} />
                                    <View style={styles.diagnoseState}>
                                        <View style={styles.stateList}>
                                            <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                            <View style={[styles.state, { backgroundColor: this.color(mobility) }]}>
                                                <Text style={styles.stateText}>{mobility.status}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.stateList}>
                                            <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                            <Icon name={mobility.change == 'up' ? 'up' : 'down'} size={11} color={mobility.change == 'up' ? Theme.upColor : Theme.downColor} />
                                        </View>
                                    </View>
                                    <View style={styles.echarts}>
                                        <Echarts option={BarChart.bar2('借款期限(月)', '借款期限', dateTimeAll, dataLoanPeriod, 30)} height={180} />
                                    </View>
                                    <DashLine width={Theme.screenWidth - 34} />
                                    <View style={styles.diagnoseInstruction}>
                                        <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                        <Text style={styles.diagnoseInstructionText}>1. 借款期限数值越低代表流动性越好，资金的灵活性越高。</Text>
                                        <Text style={styles.diagnoseInstructionText}>2. 借款期限数值越高代表流动性越差，资金的灵活性越低。</Text>
                                    </View>
                                </View>
                            </View>
                            {/*流动性诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-fenshan'} size={55} color={this.color(dispersion)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>分散度诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{dispersion.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(dispersion) }]}>
                                            <Text style={styles.stateText}>{dispersion.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={dispersion.change == 'up' ? 'up' : 'down'} size={11} color={dispersion.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('人均借款金额(万元)', '人均借款金额', dateTimeAll, dataAvgBorrowMoney, 30)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 借款金额数值越低代表分散度越好，系统性风险越低。</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 借款金额数值越高代表分散度越差，系统性风险越高。</Text>
                                </View>
                            </View>
                            {/*分散度诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-renqi'} size={55} color={this.color(popularity)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>人气诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{popularity.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(popularity) }]}>
                                            <Text style={styles.stateText}>{popularity.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={popularity.change == 'up' ? 'up' : 'down'} size={11} color={popularity.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('投资人数(人)', '投资人数', dateTimeAll, dataBidderNum, 50)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 投资人数数值越高代表人气越好。</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 投资人数数值越低代表人气越差。</Text>
                                </View>
                            </View>
                            {/*人气诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-tiliang'} size={55} color={this.color(stayStill)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>体量诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{stayStill.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(stayStill) }]}>
                                            <Text style={styles.stateText}>{stayStill.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={stayStill.change == 'up' ? 'up' : 'down'} size={11} color={stayStill.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('累计待还金额(万元)', '累计待还金额', dateTimeAll, dataStayStillOfTotal, 75)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 累计待还金额数值越高代表体量越大，系统性风险越低。</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 累计待还金额数值越低代表体量越低，系统性风险越高。</Text>
                                </View>
                            </View>
                            {/*体量诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-zhongchengdu'} size={55} color={this.color(loyalty)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>忠诚度诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{loyalty.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(loyalty) }]}>
                                            <Text style={styles.stateText}>{loyalty.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={loyalty.change == 'up' ? 'up' : 'down'} size={11} color={loyalty.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('人均投资金额(万元)', '人均投资金额', dateTimeAll, dataAvgBidMoney, 35)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 人均投资金额越高代表用户忠诚度越高，平台越健康。</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 人均投资金额越低代表用户忠诚度越低，平台越不健康。</Text>
                                </View>
                            </View>
                            {/*忠诚度诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-chengzhang'} size={55} color={this.color(growth)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>成长性诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{growth.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(growth) }]}>
                                            <Text style={styles.stateText}>{growth.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={growth.change == 'up' ? 'up' : 'down'} size={11} color={growth.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('待收投资人数(人)', '待收投资人数', dateTimeAll, dataBidderWaitNum, 60)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 待收投资人数数值越高代表用户体量健康，成长性越好。</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 待收投资人数数值越低代表用户体量萎靡，成长性越差。</Text>
                                </View>
                            </View>
                            {/*成长性诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-shouyi'} size={55} color={this.color(rate)} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>收益率诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{rate.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: this.color(rate) }]}>
                                            <Text style={styles.stateText}>{rate.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={rate.change == 'up' ? 'up' : 'down'} size={11} color={rate.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('利率(%)', '利率', dateTimeAll, dataRate, 38)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>

                                    <Text style={styles.diagnoseInstructionText}>说明：利率数据高低与平台安全性没有直接关系，仅作为数据参考</Text>

                                </View>
                            </View>
                            {/*收益率诊断 end*/}

                            <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-fumian'} size={55} color={'#b8c1c7'} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>负面事件诊断</Text>

                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.fumianBox}>
                                    {
                                        negative != '' && negative != null ?
                                            negative.split('<p>').map((text) => {
                                                let list = text.split('<href>');
                                                return (
                                                    <TouchableOpacity style={styles.fumianList}
                                                        onPress={() => {
                                                            list[1] ?
                                                                navigation.navigate('DetailFumian', { url: list[1] })
                                                                :
                                                                null

                                                        }}
                                                    >
                                                        <Text style={styles.fumianListText}>{list[0]}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                            :
                                            <Text style={styles.fumianNull}>暂无负面信息</Text>
                                    }
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>

                                    <Text style={styles.diagnoseInstructionText}>说明：不断有负面信息的平台，往往是出事的前兆。</Text>

                                </View>
                            </View>
                            {/*收益率诊断 end*/}
                        </ScrollView>
                        :
                        <Text style={styles.null}>暂无数据</Text>
                }
            </View>

        )
    }

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },
    healthTop: {
        paddingLeft: 17,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    healthTopText: {
        fontSize: 11,
        color: '#999',
        lineHeight: 22.
    },
    diagnoseBox: {
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 15,
        paddingBottom: 15,
    },
    diagnoseHeader: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    diagnoseHeaderIcon: {
        width: 70,
    },
    diagnoseHeaderRight: {
        flex: 1,
    },
    titleText: {
        paddingBottom: 8,
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    diagnoseHeaderText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 14,
    },
    diagnoseState: {
        paddingTop: 15,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    stateList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
    },
    diagnoseStateLebelText: {
        fontSize: 12,
        color: '#999',
    },
    state: {
        width: 40,
        height: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateText: {
        fontSize: 14,
        color: '#fff',
    },
    diagnoseInstruction: {
        paddingTop: 10,
    },
    diagnoseInstructionText: {
        fontSize: 11,
        color: '#bbb',
        lineHeight: 18,
    },
    fumianBox: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    fumianListText: {
        paddingTop: 6,
        paddingBottom: 6,
        fontSize: 12,
        color: '#707070',
        textDecorationLine: 'underline',
    },
    fumianNull: {
        fontSize: 12,
        color: '#bbb',
    },
    null: {
        paddingLeft: (Theme.screenWidth - 280) / 2,
        paddingTop: 10,
        color: '#bbb',
        fontSize: 14,
    },
})