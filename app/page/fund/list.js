import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Echarts from 'native-echarts';
import PieEcharts from '../../echarts/pie';

export default class FundList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        let navigation = this.props.navigation;
        let data = this.props.data;
        let type = this.props.fundType;
        let fundData = [];
        for (let i = 0; i < data.length; i++) {
            fundData.push({ value: data[i].fund_amount, name: data[i].plat_name + '\n' + '(' + data[i].fund_amount + '万)' })
        }
        let fundType, fundS, fundRenqun, star;
        switch (type) {
            case 1:
                fundType = '1号';
                fundS = '稳健型';
                fundRenqun = '以稳健安全为首选目标，风险厌恶型的人群';
                star = '★★★★★';
                break;
            case 2:
                fundType = '2号';
                fundS = '平衡型';
                fundRenqun = '以平衡为首选目标，能承受低风险的人群';
                star = '★★★★';
                break;
            case 3:
                fundType = '3号';
                fundS = '收益型';
                fundRenqun = '以收益为首选目标，能承受少量风险的人群';
                star = '★★★';
                break;
        }
        return (
            <ScrollView>
                <View style={stylesList.update}>
                    <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                    <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                </View>
                <View>
                    <View style={styles.fundTitle}>
                        <Text style={styles.fundTitleText}>{fundType}示范投资({fundS}）</Text>
                    </View>
                    <View style={styles.fundTop}>
                        <Text style={styles.fundTopText}>安全指数：<Text style={{ fontSize: 16 }}>{star}</Text></Text>
                        <Text style={styles.fundTopText}>适合人群：{fundRenqun}</Text>
                        <Text style={styles.fundTopText}>投资组成如下：</Text>
                    </View>
                    <Echarts option={PieEcharts.pieFund(fundData)} height={175} />
                    {
                        data.map((item) => {
                            return (
                                <TouchableOpacity style={styles.fundlist} activeOpacity={0.5}
                                    onPress={() => {
                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                    }}
                                >
                                    <View style={styles.fundlistHd}>
                                        <Text style={styles.platname}>{item.plat_name}</Text>
                                        <Text style={styles.rate}>平均利率：<Text style={{ color: '#2D3640' }}>{item.fund_rate}%</Text></Text>
                                        <Text style={styles.amount}>已投资：<Text style={{ color: '#2D3640' }}>{item.fund_amount}万</Text></Text>
                                    </View>
                                    <View style={styles.fundlistReasons}>
                                        {
                                            item.fund_reasons.split('<br />').map((list) => {
                                                return (
                                                    <Text style={styles.fundlistReasonsText}>{list}</Text>
                                                )
                                            })
                                        }
                                    </View >
                                    <Text style={styles.fundlistZ}>综上，{fundType}示范投资（{fundS}）决定进入投资。</Text>
                                </TouchableOpacity>
                            )
                        })

                    }
                </View>
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    fundTitle: {
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 15,
        marginBottom: 10,
    },
    fundTitleText: {
        color: '#2D3640',
        fontSize: 14,
    },
    fundTop: {
        paddingLeft: 10,
    },
    fundTopText: {
        color: '#ccc',
        lineHeight: 24,
        fontSize: 13,
    },
    fundlist: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    fundlistHd: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    platname: {
        width: 85,
        color: '#2D3640',
        fontSize: 13,
    },
    rate: {
        width: 130,
        color: '#ccc',
        fontSize: 13,
    },
    amount: {
        color: '#ccc',
        fontSize: 13,
    },
    fundlistReasonsText: {
        color: '#ccc',
        lineHeight: 22,
        fontSize: 13,
    },
    fundlistZ: {
        lineHeight: 22,
        color: '#ccc',
    }
})