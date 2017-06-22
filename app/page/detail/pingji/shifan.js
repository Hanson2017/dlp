import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Util from '../../../util/util';

export default class Bijiao extends React.Component {
    render() {
        const navigation = this.props.navigation;
        let data = this.props.data;
        let platName = this.props.platName;
        let fundType;
        let fundS;
        if (data != null) {
            switch (data.fund_type) {
                case 1:
                    fundType = '1号';
                    fundS = '稳健型'
                    break;
                case 2:
                    fundType = '2号'
                    fundS = '平衡型'
                    break;
                case 3:
                    fundType = '3号'
                    fundS = '收益型'
                    break;
                case 4:
                    fundType = '活期'
                    fundS = '高流动型'
                    break;
            }
        }

        return (
            <View>
                {data != null ?
                    <ScrollView>
                        <Text style={styles.shifanTitle}>{fundType}示范投资（{fundS}）已进入投资“{platName}”</Text>
                        <View style={styles.shifanBox}>
                            <Text style={styles.boxTitle}>基金投资状态</Text>
                            <View style={[styles.boxCon, { flexDirection: 'row', }]}>
                                <Text style={[styles.boxConText, { marginRight: 30, }]}>总投资额：{data.amount}万</Text>
                                <Text style={styles.boxConText}>平均收益率：{data.rate}%</Text>
                            </View>
                        </View>
                        <View style={styles.shifanBox}>
                            <Text style={styles.boxTitle}>{fundType}示范基金投资理由</Text>
                            <View style={styles.boxCon}>
                                {
                                    data.reasons.split('<br />').map((text) => {
                                        return (
                                            <Text style={styles.boxConText}>{text}</Text>
                                        )
                                    })

                                }
                                <Text style={[styles.boxConText, { marginTop: 10, }]}>综上，示范基金{fundType}（{fundS}）决定进入投资。</Text>
                            </View>
                        </View>
                        <View style={styles.shifanBox}>
                            <Text style={styles.boxTitle}>缺点分析及投资建议</Text>
                            <View style={styles.boxCon}>
                                <Text style={styles.boxConText}>缺点分析：</Text>
                                {
                                    data.analysis.split('<br />').map((text) => {
                                        return (
                                            <Text style={styles.boxConText}>{text}</Text>
                                        )
                                    })
                                }
                                <Text style={styles.boxConText}>投资建议</Text>
                                {
                                    data.proposals.split('<br />').map((text) => {
                                        return (
                                            <Text style={styles.boxConText}>{text}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.shifanBox}>
                            <Text style={styles.boxTitle}>后续投资计划</Text>
                            <View style={styles.boxCon}>
                                {
                                    Util.formatDate(data.enddate) > Util.setDate(new Date()) ?
                                        <Text style={styles.boxConText}>目前正在正常投资，近期暂无撤出计划。</Text>
                                        :
                                        <Text style={[styles.boxConText, { color: 'red' }]}>示范投资正在退出，在未来10日内，将退出完毕。</Text>
                                }
                            </View>
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.nullWp}>
                        <Text style={styles.nullText}>示范投资目前没有投资“{platName}”</Text>
                        <Text style={styles.nullText}>想了解示范投资目前进入了哪些平台，</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.nullText}>请进入</Text>
                            <TouchableOpacity
                                onPress={()=>{
                                    navigation.navigate('Fund')
                                }}
                            >
                                <Text style={[styles.nullText, { color: '#2D3640' }]}>“示范投资”</Text>
                            </TouchableOpacity>
                            <Text style={styles.nullText}>模块进行查看。</Text>
                        </View>
                    </View>
                }
            </View>


        )
    }
}
const styles = StyleSheet.create({
    shifanTitle: {
        paddingLeft: 15,
        paddingBottom: 15,
        paddingTop: 10,
        color: '#2D3640',
    },
    shifanBox: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    boxTitle: {
        paddingBottom: 8,
        color: '#ccc',
    },
    boxConText: {
        color: '#ABB7C4',
        lineHeight: 24,
    },
    nullWp: {
        padding: 15,
        paddingTop:5,
    },
    nullText: {
        color: '#ccc',
        lineHeight: 30,
    }
})
