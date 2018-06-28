import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Echarts from 'native-echarts';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';
import BarChart from '../../../../echarts/bar';


export default class DetailHealthOther extends React.Component {
    render() {
        let data = this.props.data;

        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataAmount = []  //成交量走势
            var dataBorrowerNum = []  //每日借款人数走势
            var dataBorrowWaitNum = []  //待还借款人数
            var dataFullloanTime = []   //满标用时

            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataAmount.push(data.listdata[i].amount)
                dataBorrowerNum.push(data.listdata[i].borrowerNum)
                dataBorrowWaitNum.push(data.listdata[i].borrowWaitNum)
                dataFullloanTime.push(data.listdata[i].fullloanTime)
            }
        }

        return (
            <View>
                {
                    data.listdata != null && data.listdata.length > 0 ?
                        <ScrollView contentContainerStyle={styles.container}>
                            <View style={[Theme.box]}>
                                <Title data={'成交量走势'} />
                                <View style={styles.diagnoseBox}>
                                    <Echarts option={BarChart.bar2('成交量走势(万元)', '成交量走势', dateTimeAll, dataAmount, 70)} height={180} />
                                </View>
                            </View>
                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'每日借款人数走势'} />
                                <View style={styles.diagnoseBox}>
                                    <Echarts option={BarChart.bar2('每日借款人数走势(人)', '每日借款人数走势', dateTimeAll, dataBorrowerNum, 70)} height={180} />
                                </View>
                            </View>
                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'待还借款人数走势'} />
                                <View style={styles.diagnoseBox}>
                                    <Echarts option={BarChart.bar2('待还借款人数走势(人)', '待还借款人数走势', dateTimeAll, dataBorrowWaitNum, 70)} height={180} />
                                </View>
                            </View>
                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'满标用时走势'} />
                                <View style={styles.diagnoseBox}>
                                    <Echarts option={BarChart.bar2('满标用时走势(分钟)', '满标用时走势', dateTimeAll, dataFullloanTime, 70)} height={180} />
                                </View>
                            </View>
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
    diagnoseBox:{
        paddingLeft: 10,
        paddingRight: 17,
        paddingTop: 15,
        paddingBottom: 15,
    },
    null: {
        padding: 17,
        paddingTop: 10,
        paddingLeft:(Theme.screenWidth-280)/2,
        color: '#bbb',
        fontSize: 14,
    },
})