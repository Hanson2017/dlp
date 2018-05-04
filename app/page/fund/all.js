import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Echarts from 'native-echarts';
import PieEcharts from '../../echarts/pie';

export default class FundAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        let data = this.props.data;
        let fund1Data = [];
        let fund2Data = [];
        let fund3Data = [];
        for (let i = 0; i < data.fund1.length; i++) {
            fund1Data.push({ value: data.fund1[i].fund_amount, name: data.fund1[i].plat_name + '\n' + '(' + data.fund1[i].fund_amount + '万)' })
        }
        for (let i = 0; i < data.fund2.length; i++) {
            fund2Data.push({ value: data.fund2[i].fund_amount, name: data.fund2[i].plat_name + '\n' + '(' + data.fund2[i].fund_amount + '万)' })
        }
        for (let i = 0; i < data.fund3.length; i++) {
            fund3Data.push({ value: data.fund3[i].fund_amount, name: data.fund3[i].plat_name + '\n' + '(' + data.fund3[i].fund_amount + '万)' })
        }
        

        let navigation = this.props.navigation;

        return (
            <ScrollView>
                <View style={stylesList.update}>
                    <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                    <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                </View>
                <View style={styles.fundTop}>
                    <Text style={styles.fundTopText}>• 示范投资目前投资总额为<Text style={{ color: 'red' }}>{data.investall}</Text>万</Text>
                    <Text style={styles.fundTopText}>• 示范投资仅起到参考作用</Text>
                    <Text style={styles.fundTopText}>• 建议合理分配资金，选择优质平台分散投资</Text>
                </View>
                <View style={styles.fundTitle}>
                    <Text style={styles.fundTitleText}>示范投资组合如下</Text>
                </View>
                <View style={styles.fundEchart}>
                    <View style={styles.fundEchartTitle}>
                        <Text style={styles.fundEchartTitleText}>1号示范投资（稳健型）</Text>
                        
                    </View>
                    <Echarts option={PieEcharts.pieFund(fund1Data)} height={175} />
                </View>
                <View style={styles.fundEchart}>
                    <View style={styles.fundEchartTitle}>
                        <Text style={styles.fundEchartTitleText}>2号示范投资（平衡型）</Text>
                       
                    </View>
                    <Echarts option={PieEcharts.pieFund(fund2Data)} height={175} />
                </View>
                <View style={styles.fundEchart}>
                    <View style={styles.fundEchartTitle}>
                        <Text style={styles.fundEchartTitleText}>3号示范投资（收益型）</Text>
                       
                    </View>
                    <Echarts option={PieEcharts.pieFund(fund3Data)} height={175} />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    fundTop: {
        paddingLeft: 10,
    },
    fundTopText: {
        lineHeight: 24,
        color: '#2D3640',
    },
    fundTitle: {
        marginTop: 20,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    fundEchart: {
        marginTop: 25,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    fundEchartTitle: {
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fundEchartTitleText: {
        color: '#ccc',
    }

})
