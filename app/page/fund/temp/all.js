import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import PieEcharts from '../../../echarts/pie';


class List extends React.Component {
    render() {
        const { listData, echartsData, type, navigation } = this.props;
        var len = 3;
        if (type == 3) {
            len = 5
        }
        return (
            <View style={[styles.fundInfo, Theme.box, Theme.mt10]}>
                <View style={styles.fundInfoHeader}>
                    <View style={styles.fundInfoHeaderLeft}>
                        <View style={[styles.fundType, styles['fundType' + type]]}>
                            <Text style={styles.fundTypeText}>{type}号</Text>
                        </View>
                        <View style={styles.fundTitle}>
                            <Text style={styles.fundTitleText}>
                                {
                                    type == 1 ?
                                        '稳健型'
                                        :
                                        type == 2 ?
                                            '平衡型'
                                            :
                                            '收益型'
                                }
                                示范投资
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.fundEchart}>
                    <Echarts option={PieEcharts.pieFund(echartsData)} height={175} />
                </View>
                <View style={styles.fundSm}>
                    <View style={styles.fundSmList}>
                        <Text style={styles.fundSmLabelText}>安全指数</Text>
                        <View style={styles.fundStart}>
                            <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                            <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                            <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                            {
                                type == 1 ?
                                    <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                    :
                                    null
                            }
                            {
                                type == 1 ?
                                    <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                    :
                                    null
                            }
                            {
                                type == 2 ?
                                    <Icon name={'fund-dunpai'} size={14} color={'#FF9800'} />
                                    :
                                    null
                            }

                        </View>
                    </View>
                    <View style={styles.fundSmList}>
                        <Text style={styles.fundSmLabelText}>适合人群</Text>
                        <Text style={styles.fundSmText}>
                            {
                                type == 1 ?
                                    '适合以稳健安全为首选目标，风险厌恶型的人群。'
                                    :
                                    type == 2 ?
                                        '适合以平衡为首选目标，能承受低风险的人群。'
                                        :
                                        '适合以收益为首选目标，能承受少量风险的人群。'
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.fundList}>
                    <View style={styles.fundListLeft}>
                        <View style={styles.fundListHd}>
                            <Text style={[styles.listHdText, styles.fundIc1]}>在投平台</Text>
                            <Text style={[styles.listHdText, styles.fundIc2]}>利率</Text>
                        </View>
                        <View style={styles.fundListBd}>
                            {
                                listData.map((item, i) => {
                                    if (i < len) {
                                        return (
                                            <View key={i} style={styles.list}>
                                                <TouchableOpacity style={styles.fundIc1}
                                                    onPress={() => {
                                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                    }}
                                                >
                                                    <Text style={[styles.listPlatText, styles.listText]}>{item.plat_name}</Text>
                                                </TouchableOpacity>
                                                <Text style={[styles.fundIc2, styles.listRateText, styles['listRateText' + type]]}>{item.fund_rate}%</Text>
                                            </View>
                                        )
                                    }

                                })
                            }

                        </View>
                    </View>
                    <View style={styles.fundListRight}>
                        <View style={styles.fundListHd}>
                            <Text style={[styles.listHdText, styles.fundIc1]}>在投平台</Text>
                            <Text style={[styles.listHdText, styles.fundIc2]}>利率</Text>
                        </View>
                        <View style={styles.fundListBd}>
                            {
                                listData.map((item, i) => {
                                    if (i >= len) {
                                        return (
                                            <View key={i} style={styles.list}>
                                                <TouchableOpacity style={styles.fundIc1}
                                                    onPress={() => {
                                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                    }}
                                                >
                                                    <Text style={[styles.listPlatText, styles.listText]}>{item.plat_name}</Text>
                                                </TouchableOpacity>
                                                <Text style={[styles.fundIc2, styles.listRateText, styles['listRateText' + type]]}>{item.fund_rate}%</Text>
                                            </View>
                                        )
                                    }

                                })
                            }

                        </View>
                    </View>
                </View>
            </View>
        )
    }
}


export default class FundAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { navigation, data } = this.props;
        const fund1 = data.fund1;
        const fund2 = data.fund2;
        const fund3 = data.fund3;

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

        return (
            <ScrollView>
                <View style={[styles.fundTop, Theme.box]}>
                    <View style={styles.fundNote}>
                        <Text style={styles.fundNoteText}>示范投资是贷罗盘运营团队发起的网贷领投基金，按照风险评估分为“稳健型”、“平衡型”、“收益型”三种，可供广大投资人参考。</Text>
                        <Text style={[styles.fundNoteText, { paddingTop: 6 }]}>示范投资目前投资总额为 <Text style={{ color: Theme.color }}>{data.investall}万</Text></Text>
                    </View>
                    <View style={styles.fundInstr}>
                        <Text style={styles.fundInstrText}>※ 建议合理分配资金，选择优质平台分散投资</Text>
                        <Text style={styles.fundInstrText}>※ 示范投资仅起到参考作用</Text>
                    </View>
                </View>
                <List listData={fund1} echartsData={fund1Data} navigation={navigation} type={1} />
                <List listData={fund2} echartsData={fund2Data} navigation={navigation} type={2} />
                <List listData={fund3} echartsData={fund3Data} navigation={navigation} type={3} />


            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    fundTop: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    fundNoteText: {
        lineHeight: 18,
        fontSize: 11,
        color: '#999',
    },
    fundInstr: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    fundInstrText: {
        lineHeight: 16,
        fontSize: 10,
        color: '#bbb',
    },
    fundInfoHeader: {
        paddingLeft: 15,
        paddingRight: 20,
        height: 38,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fundInfoHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundType: {
        marginRight: 10,
        width: 40,
        height: 24,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.fund1Color,
    },
    fundType1: {
        backgroundColor: Theme.fund1Color,
    },
    fundType2: {
        backgroundColor: Theme.fund2Color,
    },
    fundType3: {
        backgroundColor: Theme.fund3Color,
    },
    fundTypeText: {
        fontSize: 16,
        color: '#fff',
    },
    fundTitleText: {
        fontSize: 16,
        color: '#333',
        fontWeight:'bold',
    },
    fundInfoHeaderRight: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    fundEchart: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundSm: {
        paddingLeft: 30,
    },
    fundSmList: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundSmLabelText: {
        paddingRight: 5,
        fontSize: 12,
        color: '#A1A1A1'
    },
    fundStart: {
        flexDirection: 'row',
    },
    fundSmText: {
        fontSize: 12,
        color: '#707070'
    },
    fundList: {
        marginTop: 20,
        marginBottom: 25,
        paddingLeft: 30,
        flexDirection: 'row',
    },
    fundListLeft: {
        paddingRight: 5,
        marginRight: 25,
        borderRightWidth: 1,
        borderRightColor: '#f2f2f2',
    },
    fundListHd: {
        marginBottom: 5,
        flexDirection: 'row',
    },
    list: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
    },
    fundIc1: {
        width: 84,
    },
    fundIc2: {
        width: 60,
    },
    listHdText: {
        fontSize: 12,
        color: '#A1A1A1'
    },
    listPlatText: {
        fontSize: 14,
        color: '#707070'
    },
    listRateText: {
        fontSize: 14,
        color: Theme.fund1Color,
    },
    listRateText1: {
        color: Theme.fund1Color,
    },
    listRateText2: {
        color: Theme.fund2Color,
    },
    listRateText3: {
        color: Theme.fund3Color,
    },


})
