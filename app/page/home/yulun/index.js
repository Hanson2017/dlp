import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Echarts from 'native-echarts';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../yulun/item';
import PieEcharts from '../../../echarts/pie';

export default class Pingce extends React.Component {
    render() {
        const { data, navigation } = this.props;
        let echartsData = [];
        let echartsDataList = data.echart;
        for (let i = 0; i < echartsDataList.length; i++) {
            echartsData.push({ value: echartsDataList[i].date_snum, name: echartsDataList[i].platname })
        }
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'舆论监控'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Yulun', tabId: null }} />
                <View style={Theme.box}>
                    <View style={styles.echarts}>
                        <Echarts option={PieEcharts.pieYulun(echartsData)} height={200} />
                        <View style={styles.echartsTitle}><Text style={styles.echartsTitleText}>过去48小时舆论热点分布</Text></View>
                    </View>

                    <View style={styles.totalNum}>
                        <View style={[styles.totalNumT, styles.totalNumTol]}><Text style={styles.totalNumText}>舆论总条数：<Text style={styles.totalNumTextN}>{data.num.all_num}</Text></Text></View>
                        <View style={[styles.totalNumT, styles.totalNumTM]}><Text style={styles.totalNumText}>昨日条数：<Text style={styles.totalNumTextN}>{data.num.date_num}</Text></Text></View>
                    </View>
                </View>
                <View style={styles.yulunContainer}>
                    {
                        data.list.map((item, i) => {
                            return (
                                <Item key={i} data={item} navigation={navigation} borderNot={data.list.length - 1 == i ? true : false} />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    yulunContainer: {
        paddingLeft: 17,
    },
    echarts: {
        alignItems: 'center',
        width: Theme.screenWidth,
        height: 255,
    },
    echartsTitle: {
        marginTop: 15,
        width: 160,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    echartsTitleText: {
        fontSize: 12,
        color: '#999',
    },
    totalNum: {
        marginBottom:10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalNumT: {
        height: 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalNumTol: {
        
    },
    totalNumText: {
        fontSize: 12,
        color: '#bbb',
    },
    totalNumTextN:{
        color: Theme.color,
    },
})