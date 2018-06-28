import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Title from '../../../../component/title';
import Theme from '../../../../util/theme';

export default class Yunying extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {
                    data != null ?
                        <View>
                            <View style={[Theme.box]}>
                                <Title data={'交易类数据'} />
                                <View style={styles.YunyingBox}>
                                    <Text style={styles.ListText}>成交量：{data.amount} 万</Text>
                                    <Text style={styles.ListText}>资金净流入/出：{data.inamount} 万</Text>
                                    <Text style={styles.ListText}>当日待还金额：{data.stayStill}万 </Text>
                                    <Text style={styles.ListText}>累计待还：{data.stayStillOfTotal}万 </Text>
                                    <Text style={styles.ListText}>平均投资金额：{data.avgBidMoney} 万</Text>
                                    <Text style={styles.ListText}>平均借款金额：{data.avgBorrowMoney} 万</Text>
                                </View>
                            </View>

                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'用户类数据'} />
                                <View style={styles.YunyingBox}>
                                    <Text style={styles.ListText}>当日投资人数：{data.bidderNum} 人</Text>
                                    <Text style={styles.ListText}>当日借款人数：{data.borrowerNum} 人</Text>
                                    <Text style={styles.ListText}>待收投资人数：{data.bidderWaitNum} 人</Text>
                                    <Text style={styles.ListText}>待还借款人数：{data.borrowWaitNum} 人</Text>

                                </View>
                            </View>

                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'占比数据'} />
                                <View style={[styles.YunyingBox, styles.YunyingBox2]}>
                                    <Text style={[styles.ListText, styles.ListText2]}>前10大投资人待收占比：  {data.top10DueInProportion} %</Text>
                                    <Text style={[styles.ListText, styles.ListText2]}>前10大借款人待还占比：  {data.top10StayStillProportion} %</Text>
                                </View>
                            </View>

                            <View style={[Theme.box, Theme.mt10,{borderBottomWidth:0}]}>
                                <Title data={'其它数据'} />
                                <View style={styles.YunyingBox}>
                                    <Text style={styles.ListText}>收益率：{data.rate} %</Text>
                                    <Text style={styles.ListText}>平均借款期限：{data.loanPeriod} 月</Text>
                                    <Text style={styles.ListText}>满标用时：{data.fullloanTime} 分钟</Text>

                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.null}>
                            <Text style={styles.nullText}>暂无数据</Text>
                        </View>

                }

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },
    YunyingBox: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 17,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    YunyingBox2: {
        flexDirection: 'column',
    },
    ListText: {
        width: (Theme.screenWidth - 20) / 2,
        color: '#666',
        fontSize: 11,
        lineHeight: 24,
    },
    ListText2: {
        width: 200
    },
    null: {
        paddingTop: 15,
        paddingLeft: (Theme.screenWidth - 210) / 2,
        backgroundColor: '#fff',
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',
    }
    ,
})