import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Title from '../../../component/Title';
import Theme from '../../../util/theme';

export default class Yunying extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <ScrollView>
                {
                    data != null ?
                        <View>
                            <Title titleText={'交易类数据（万）'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListText}>成交量：{data.amount} </Text>
                                <Text style={styles.ListText}>资金净流入/出：{data.inamount} </Text>
                                <Text style={styles.ListText}>当日待还金额：{data.stayStill} </Text>
                                <Text style={styles.ListText}>累计待还：{data.stayStillOfTotal} </Text>
                                <Text style={styles.ListText}>平均投资金额：{data.avgBidMoney} </Text>
                                <Text style={styles.ListText}>平均借款金额：{data.avgBorrowMoney} </Text>
                            </View>
                            <Title titleText={'用户类数据（人）'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListText}>当日投资人数：{data.bidderNum} </Text>
                                <Text style={styles.ListText}>当日借款人数：{data.borrowerNum} </Text>
                                <Text style={styles.ListText}>待收投资人数：{data.bidderWaitNum} </Text>
                                <Text style={styles.ListText}>待还借款人数：{data.borrowWaitNum} </Text>

                            </View>
                            <Title titleText={'占比数据'} />
                            <View style={[styles.YunyingBox, styles.YunyingBox2]}>
                                <Text style={[styles.ListText, styles.ListText2]}>前10大投资人待收占比：  {data.top10DueInProportion} %</Text>
                                <Text style={[styles.ListText, styles.ListText2]}>前10大借款人待还占比：  {data.top10StayStillProportion} %</Text>
                            </View>
                            <Title titleText={'其它数据'} />
                            <View style={styles.YunyingBox}>
                                <Text style={styles.ListText}>收益率：{data.rate} %</Text>
                                <Text style={styles.ListText}>平均借款期限：{data.loanPeriod} 月</Text>
                                <Text style={styles.ListText}>满标用时：{data.fullloanTime} 分钟</Text>

                            </View>
                        </View>
                        :
                        <Text style={styles.null}>暂无运营数据</Text>
                }

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    YunyingBox: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    YunyingBox2: {
        flexDirection: 'column',
    },
    ListText: {
        width: (Theme.screenWidth-20)/2,
        color: '#ABB7C4',
        fontSize: 12,
        lineHeight: 24,
    },
    ListText2: {
        width: 200
    },
    null:{
        paddingTop:15,
        paddingLeft:10,
        color:'#ccc',
    }
})