import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import PieEcharts from '../../../echarts/pie';

import Liucheng from '../liucheng';

class List extends React.Component {
    render() {
        const { type, navigation, listData, borderNot } = this.props;
        var len = 3;
        if (type == 3) {
            len = 5
        }
        return (
            <View style={[styles.fundInfo, borderNot ? { borderBottomWidth: 0, } : null]}>
                <View style={styles.fundInfotHd}>

                    <View style={[styles.fundInfotHdType, styles['fundType' + type]]}><Text style={styles.fundInfotHdTypeText}>{type}号</Text></View>
                    <Text style={styles.fundInfotHdTText}>
                        {
                            type == 1 ?
                                '稳健型'
                                :
                                type == 2 ?
                                    '平衡型'
                                    :
                                    '收益型'
                        }
                    </Text>
                </View>
                <View style={styles.fundInfoBdLi}>
                    <Text style={styles.fundInfoBdLiLabel}>安全指数</Text>
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
                <View style={styles.fundInfoBdLi}>
                    <Text style={styles.fundInfoBdLiLabel}>适合人群</Text>
                    <Text style={styles.fundInfoBdLiText}>
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
                {
                    listData.length > 0 ?
                        <View style={styles.fundList}>
                            <View style={[styles.fundListLeft,listData.length<len?{borderRightWidth:0}:null]}>
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
                            {
                                listData.length >= len ?
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
                                    :
                                    null
                            }

                        </View>
                        :
                        <Text style={styles.null}>暂无</Text>
                }
                {/* <View style={styles.fundListBdLi}>
                    <Text style={[styles.fundListBdLiLabel, styles.fundListBdLiLabel2]}>在投平台</Text>
                    <View style={styles.fundListBdLiPlats}>
                        {
                            dataList !== null && dataList !== '' && dataList.length > 0 ?
                                dataList.map((item, i) => {
                                    return (
                                        <TouchableOpacity key={i} style={styles.platName}><Text style={styles.platNameText}>{item.plat_name}</Text></TouchableOpacity>
                                    )
                                })
                                :
                                <Text style={styles.null}>暂无</Text>
                        }
                    </View>
                </View> */}
            </View>
        )
    }
}


export default class FundAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        };
    }
    render() {
        const { navigation, data } = this.props;
        const { isHidden } = this.state;
        const fund_process = data.fund_process;
        const fundAll = data.fundall;
        const fund1 = data.fund1;
        const fund2 = data.fund2;
        const fund3 = data.fund3;

        let fundData = [];
        for (let i = 0; i < fundAll.length; i++) {
            fundData.push({ value: fundAll[i].fund_amount, name: fundAll[i].plat_name + '\n' + '(' + fundAll[i].fund_amount + '万)' })
        }
        return (
            <ScrollView>
                <View style={[Theme.box]}>
                    <View style={styles.fundNote}>
                        <Text style={styles.fundNoteText}>※ 示范出借目前出借总额为 <Text style={{ color: Theme.color }}>{data.investall}万</Text>。</Text>
                        <Text style={[styles.fundNoteText]}>※ 建议合理分配资金，选择优质平台分散出借。</Text>
                        <Text style={styles.fundNoteText}>※ 示范出借仅起到参考作用，不构成安全性评价或出借建议，任何风险用户自行承担。</Text>
                    </View>
                    <Title data={'出借整体分布'} borderNot={true} />
                    <View style={styles.fundEchart}>
                        <Echarts option={PieEcharts.pieFund(fundData, ['#4847bf', '#7f7fff', '#006699', '#94c4e2', '#4d9dcf', '#ffc55c', '#e88613', '#9c6c33', '#e2b394', '#c69c6d', '#b19deb', '#9c45de', '#4d226d', '#8557a7', '#662d91', '#9a308d', '#9686ae', '#9b9fc3', '#8f71a6', '#6264d6'])} height={175} width={320} />
                    </View>
                    <TouchableOpacity style={styles.openMore} activeOpacity={0.6} onPress={() => {
                        this.setState({
                            isHidden: !this.state.isHidden
                        })
                    }}>
                        <Text style={styles.openMoreText}>{isHidden ? '展开详细分布' : '收起详细分布'}</Text>
                    </TouchableOpacity>
                    {
                        isHidden ?
                            null
                            :
                            <View style={styles.fundContainer}>
                                <List type={1} navigation={navigation} listData={fund1} />
                                <List type={2} navigation={navigation} listData={fund2} />
                                <List type={3} navigation={navigation} listData={fund3} borderNot={true} />
                            </View>
                    }
                </View>

                <Liucheng title={'示范出借最新动态'} navigation={navigation} data={fund_process} />

            </ScrollView>
        )
    }
}





const styles = StyleSheet.create({
    fundNote: {
        marginLeft: 10,
        paddingLeft: 7,
        paddingRight: 10,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    fundNoteText: {
        fontSize: 12,
        color: '#999',
        lineHeight: 20,
    },
    fundEchart: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    openMore: {
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 17,
        width: 90,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#83CAFF',
    },
    openMoreText: {
        color: '#fff',
        fontSize: 12,
    },
    fundContainer: {

        paddingLeft: 10,
    },
    fundInfo: {
        paddingLeft: 7,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    fundInfotHd: {
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundInfotHdType: {
        marginRight: 10,
        width: 48,
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
    fundInfotHdTypeText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    fundInfotHdTText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    fundInfoBdLi: {
        flexDirection: 'row',
        marginBottom: 12,

    },
    fundInfoBdLiLabel: {
        width: 55,
        paddingRight: 5,
        fontSize: 12,
        color: '#A1A1A1'
    },
    fundListBdLiLabel2: {
        lineHeight: 14,
    },
    fundStart: {
        flexDirection: 'row',
    },
    fundInfoBdLiText: {
        paddingRight: 10,
        flex: 1,
        fontSize: 12,
        color: '#707070'
    },
    fundListBdLiPlats: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    platName: {
        width: 67,
        marginBottom: 5
    },
    platNameText: {
        fontSize: 14,
        color: '#666',
    },
    null: {
        fontSize: 14,
        color: '#999',
    },


    fundList: {
        marginTop: 5,
        marginBottom: 25,
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
    null: {

        paddingBottom: 20,
        color: '#bbb',
        fontSize: 12,
    },
})