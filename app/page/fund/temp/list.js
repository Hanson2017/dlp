import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import stylesList from '../../../css/listData';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import PieEcharts from '../../../echarts/pie';

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
                <View style={[styles.fundTop, Theme.box]}>
                    <View style={styles.fundInfoHeader}>
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
                            <Text style={styles.fundSmText}>{fundRenqun}</Text>
                        </View>
                    </View>
                    <View style={styles.echart}>
                        <Echarts option={PieEcharts.pieFund(fundData)} height={175} />
                        <View style={styles.echartBtn}>
                            <Text style={styles.echartBtnText}>投资组成</Text>
                        </View>
                    </View>

                </View>

                {
                    data.map((item) => {
                        return (
                            <View style={[styles.fundlist, Theme.box, Theme.mt10]}>
                                <TouchableOpacity style={styles.fundlistHd} activeOpacity={0.5}
                                    onPress={() => {
                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                    }}
                                >
                                    <View style={styles.fundlistHdLeft}>
                                        <Icon name={'fund-icon'} size={17} color={Theme['fund' + type + 'Color']} />
                                        <Text style={styles.platnameText}>{item.plat_name}</Text>
                                    </View>
                                    <View style={styles.fundlistHdLeft}>
                                        <Icon name={'triangle-right22'} size={12} color={'#bbb'} />
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.fundlistBd}>
                                    <View style={styles.fundlistBdHd}>
                                        <Text style={[styles.listIc1, styles.listHdText]}>[在投项目]</Text>
                                        <Text style={[styles.listIc2, styles.listHdText]}>[投资额]</Text>
                                        <Text style={[styles.listIc3, styles.listHdText]}>[年化收益率]</Text>
                                    </View>
                                    {
                                        item.investlist.map((list, i) => {
                                            return (
                                                <View style={styles.fundlistBdList} key={i}>
                                                    <Text style={[styles.listIc1, styles.listXM]}>{list.name}</Text>
                                                    <Text style={[styles.listIc2, styles.listTZE]}>{list.invest}万</Text>
                                                    <Text style={[styles.listIc3, styles.listRate, , styles['listRate' + type]]}>{list.rate}%</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={styles.fundlistReasons}>
                                    <Text style={styles.fundlistReasonsTitleText}>[投资理由]</Text>
                                    <View style={styles.fundlistReasonsBox}>
                                        {
                                            item.fund_reasons.split('<br />').map((list) => {
                                                return (
                                                    <Text style={styles.fundlistReasonsText}>{list}</Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View >
                            </View>
                        )
                    })

                }
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    fundTop: {
        paddingTop: 20,
        paddingBottom: 20,
    },
    fundInfoHeader: {
        paddingLeft: 20,
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
        fontSize: 18,
        color: '#333',
        fontWeight:'bold',
    },
    fundEchart: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundSm: {
        paddingTop: 15,
        paddingLeft: 20,
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
    echart: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    echartBtn: {
        width: 100,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    echartBtnText: {
        fontSize: 12,
        color: '#A1A1A1'
    },
    fundlist: {
        paddingBottom: 20,
    },
    fundlistHd: {
        paddingLeft: 12,
        paddingRight: 20,
        height: 38,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fundlistHdLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    platnameText: {
        paddingLeft: 5,
        fontSize: 16,
        color: '#333',
        fontWeight:'bold',
    },
    fundlistBd: {
        paddingTop: 15,
        paddingLeft: 12,
    },
    fundlistBdHd: {
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listHdText: {
        fontSize: 12,
        color: '#A1A1A1'
    },
    fundlistBdList: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listIc1: {
        width: 134,
    },
    listIc2: {
        width: 94,
    },
    listXM: {
        fontSize: 16,
        color: '#707070'
    },
    listTZE: {
        fontSize: 16,
        color: '#707070'
    },
    listRate: {
        fontSize: 16,
        color: '#707070'
    },
    listRate1: {
        color: Theme.fund1Color,
    },
    listRate2: {
        color: Theme.fund2Color,
    },
    listRate3: {
        color: Theme.fund3Color,
    },
    fundlistReasons: {
        marginTop: 20,

        marginLeft: 12,
        marginRight: 12,

    },
    fundlistReasonsTitleText: {
        fontSize: 12,
        color: '#707070'
    },
    fundlistReasonsBox: {
        marginTop: 5,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#F5F5F5',
    },
    fundlistReasonsText: {
        lineHeight: 18,
        fontSize: 12,
        color: '#A1A1A1'
    },

})