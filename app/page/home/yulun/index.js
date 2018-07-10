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
    
})