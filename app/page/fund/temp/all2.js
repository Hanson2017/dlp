import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Echarts from 'native-echarts';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import PieEcharts from '../../../echarts/pie';

class List extends React.Component {
    render() {
        const { type, navigation, dataList, borderNot } = this.props;
        return (
            <View style={[styles.fundList, borderNot ? { borderBottomWidth: 0, } : null]}>
                <View style={styles.fundListHd}>

                    <View style={[styles.fundListHdType, styles['fundType' + type]]}><Text style={styles.fundListHdTypeText}>{type}号</Text></View>
                    <Text style={styles.fundListHdTypeTText}>
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
                <View style={styles.fundListBdLi}>
                    <Text style={styles.fundListBdLiLabel}>安全指数</Text>
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
                <View style={styles.fundListBdLi}>
                    <Text style={styles.fundListBdLiLabel}>适合人群</Text>
                    <Text style={styles.fundListBdLiText}>
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
                <View style={styles.fundListBdLi}>
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
                </View>
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
        const fund1 = data.fund1;
        let fund1Data = [];
        for (let i = 0; i < data.fund1.length; i++) {
            fund1Data.push({ value: data.fund1[i].fund_amount, name: data.fund1[i].plat_name + '\n' + '(' + data.fund1[i].fund_amount + '万)' })
        }
        return (
            <ScrollView>
                <View style={[Theme.box]}>
                    <View style={styles.fundNote}>
                        <Text style={styles.fundNoteText}>※ 示范投资目前投资总额为 <Text style={{ color: Theme.color }}>{data.investall}万</Text>。</Text>
                        <Text style={[styles.fundNoteText]}>※ 建议合理分配资金，选择优质平台分散投资。</Text>
                        <Text style={styles.fundNoteText}>※ 示范投资仅起到参考作用，不构成安全性评价或投资建议，任何风险用户自行承担。</Text>
                    </View>
                    <Title data={'投资整体分布'} borderNot={true} />
                    <View style={styles.fundEchart}>
                        <Echarts option={PieEcharts.pieFund(fund1Data, ['#4847bf', '#7f7fff', '#006699', '#94c4e2', '#4d9dcf'])} height={175} width={320} />
                    </View>
                    <TouchableOpacity style={styles.openMore} activeOpacity={0.6} onPress={() => {
                        this.setState({
                            isHidden: !this.state.isHidden
                        })
                    }}>
                        <Text style={styles.openMoreText}>展开详细分布</Text>
                    </TouchableOpacity>
                    {
                        isHidden ?
                            null
                            :
                            <View style={styles.fundListContainer}>
                                <List type={1} navigation={navigation} dataList={[{ plat_name: '陆金所', id: 1 }, { plat_name: '积木盒子', id: 2 }, { plat_name: '宜人贷', id: 1 }]} />
                                <List type={2} navigation={navigation} dataList={[{ plat_name: '陆金所', id: 1 }, { plat_name: '积木盒子', id: 2 }, { plat_name: '宜人贷', id: 1 }, { plat_name: '积木盒子', id: 2 }, { plat_name: '宜人贷', id: 1 }]} />
                                <List type={3} navigation={navigation} dataList={[]} borderNot={true} />
                            </View>
                    }
                </View>


                <View style={[Theme.mt10]}>
                    <View style={[Theme.box, styles.fundLiuc]}>
                        <Title data={'实盘最新动态'} />
                    </View>
                    <View style={[Theme.box, styles.fundLiucList]}>
                        <View style={styles.fundLiucListDate}>
                            <FontAwesome name={'calendar'} size={15} color={'#999'} />
                            <Text style={styles.fundLiucListDateText}>2018.10.25</Text>
                        </View>
                        <View style={styles.fundLiucListContent}>
                            <TouchableOpacity style={styles.platNameLc}>
                                <Text style={styles.platNameLcText}>桔子理财</Text>
                            </TouchableOpacity>
                            <View style={styles.fundLiucListCC}>
                                <Text style={styles.fundLiucListCCText}>注册新账户，充值20000元，</Text>
                                <Text style={styles.fundLiucListCCText}>投资项目为“财富汇”，周期为3个月，年化收益率为9%。</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[Theme.box, styles.fundLiucList, Theme.mt10]}>
                        <View style={styles.fundLiucListDate}>
                            <FontAwesome name={'calendar'} size={15} color={'#999'} />
                            <Text style={styles.fundLiucListDateText}>2018.10.25</Text>
                        </View>
                        <View style={styles.fundLiucListContent}>
                            <TouchableOpacity style={styles.platNameLc}>
                                <Text style={styles.platNameLcText}>积木盒子</Text>
                            </TouchableOpacity>
                            <View style={styles.fundLiucListCC}>
                                <Text style={styles.fundLiucListCCText}>注册新账户，充值20000元，</Text>
                                <Text style={styles.fundLiucListCCText}>投资项目为“财富汇”，周期为3个月，年化收益率为9%。</Text>
                            </View>
                            <View style={styles.fundLiucListBz}>
                                <Text style={styles.fundLiucListBzText}>备注：</Text>
                                <Text style={styles.fundLiucListBzText}>需先消耗3000桔子购买VIP，VIP产品里可获取0.5%加息</Text>
                                <Text style={styles.fundLiucListBzText}>该项目满90天后可债转，管理费1%。</Text>
                            </View>
                            <View style={styles.fundLiucListPic}>
                                <View style={styles.fundLiucListPicTit}>
                                    <Text style={styles.fundLiucListPicTitText}>相关截图</Text>
                                </View>
                                <View style={styles.fundLiucListPicCon}>
                                    <View style={styles.fundLiucListPicLi}>
                                        <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} style={styles.pic} />
                                    </View>
                                    <View style={styles.fundLiucListPicLi}>
                                        <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} style={styles.pic} />
                                    </View>
                                    <TouchableOpacity style={styles.fundLiucListPicMore} activeOpacity={0.4}
                                        onPress={()=>{
                                            navigation.navigate('ShowPic')
                                        }}
                                    >
                                        <Text style={styles.fundLiucListPicMoreText}>查看全部</Text>
                                        <Text style={styles.fundLiucListPicMoreText}>相关截图</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.fundLiucListHt}>
                                <View style={styles.fundLiucListPicTit}>
                                    <Text style={styles.fundLiucListPicTitText}>相关合同</Text>
                                </View>
                                <TouchableOpacity style={styles.fundhtdown}>
                                    <Text style={styles.fundhtdownText}>查看出借合同</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
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
    fundListContainer: {

        paddingLeft: 10,
    },
    fundList: {
        paddingLeft: 7,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: 15,
    },
    fundListHd: {
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundListHdType: {
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
    fundListHdTypeText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    fundListHdTypeTText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    fundListBdLi: {
        flexDirection: 'row',
        marginBottom: 12,

    },
    fundListBdLiLabel: {
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
    fundListBdLiText: {
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

    fundLiuc: {
        paddingBottom: 10,
    },
    fundLiucListDate: {
        paddingLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundLiucListDateText: {
        paddingLeft: 5,
        color: '#A1A1A1',
        fontSize: 12,
    },
    fundLiucListContent: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 17,
        paddingRight: 15,
    },
    fundLiucListCCText: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
        lineHeight: 18,
    },
    fundLiucListBz: {
        paddingTop: 15,
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fundLiucListBzText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 18,
    },
    fundLiucListPic: {
        paddingTop: 15,
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fundLiucListPicTit: {
        marginBottom: 8,
    },
    fundLiucListPicTitText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    fundLiucListPicCon: {

        flexDirection: 'row',
    },
    pic: {
        marginRight: 10,
        width: (Theme.screenWidth - 70) / 3,
        height: (Theme.screenWidth - 70) / 3,
        borderWidth: 1,
        borderColor: '#eee',
    },
    fundLiucListPicMore: {
        width: (Theme.screenWidth - 70) / 3,
        height: (Theme.screenWidth - 70) / 3,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundLiucListPicMoreText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 20,
    },
    fundLiucListHt: {
        marginTop: 25,
    },
    fundhtdownText: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'underline',
    },
    platNameLc: {
        marginBottom: 15,
    },
    platNameLcText: {
        fontSize: 16,
        color: '#0096E6',
        fontWeight: 'bold',
    }
})