import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import PieEcharts from '../../../echarts/pie';

class List extends React.Component {
    render() {
        const { labelText, data } = this.props;
        return (
            <View style={styles.list}>
                <Text style={styles.listlabel}>{labelText}</Text>
                <View style={styles.listCon}>
                    <Text style={styles.listNum}>{data.valuenum}</Text>
                    <Icon name={data.preday.change} size={10} color={data.preday.change == 'up' ? Theme.upColor : Theme.downColor} />
                </View>
            </View>
        )
    }
}

export default class Dapan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
        };
    }
    render() {
        const { data, navigation } = this.props;
        const { isHidden } = this.state;
        const inamount = data.inamount;
        const markent = data.markent;

        let echartsData = [];
        let echartsDataList = data.echartYulun;
        for (let i = 0; i < echartsDataList.length; i++) {
            echartsData.push({ value: echartsDataList[i].date_snum, name: echartsDataList[i].platname })
        }

        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'行业动态'} />
                <View style={styles.dapanCon}>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusLeft}>
                            <Text style={styles.statusLeftTextLabel}>资金流状态</Text>
                            <Text style={styles.statusLeftTextState}>{inamount.status}</Text>
                        </View>
                        <View style={styles.statusRight}>
                            <Image source={require('../../../../resources/images/kedu.png')} style={styles.imgkedu} />
                            <View style={[styles.imgzhizhenContainer, { left: inamount.score / 180 * 231 }]}>
                                <Image source={require('../../../../resources/images/zhizhen.png')} style={styles.imgzhizhen} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.statusTextContainer}>
                        <Text style={styles.statusTextContainerText}>{inamount.detailinfo}</Text>
                    </View>
                    <TouchableOpacity style={styles.openBtn}
                        onPress={() => {
                            this.setState({
                                isHidden: !this.state.isHidden
                            })
                        }}
                    >
                        <Text style={styles.openBtnText}>{isHidden ? '展开大盘参数' : '收起大盘参数'}</Text>
                    </TouchableOpacity>
                    {
                        isHidden ?
                            null
                            :
                            <View style={styles.dataList}>
                                <List labelText={'资金流指数'} data={markent.inamount} />
                                <List labelText={'交易指数'} data={markent.amount} />
                                <List labelText={'人气指数'} data={markent.popularity} />
                                <List labelText={'流动性指数'} data={markent.mobility} />
                                <List labelText={'分散度指数'} data={markent.dispersion} />
                                <List labelText={'忠诚度指数'} data={markent.loyalty} />
                                <List labelText={'利率指数'} data={markent.rate} />
                            </View>
                    }

                </View>
                <View style={styles.newBlackContainer}>
                    <View style={styles.newBlackTitle}>
                        <View style={styles.newBlackTitleLeft}>
                            <Icon name={'ico-zhengyi'} size={14} color={'#A81616'} />
                            <Text style={styles.newBlackTitleLeftText}>最新争议平台</Text>
                        </View>
                        <TouchableOpacity style={styles.newBlackTitleRight}
                            onPress={() => { navigation.navigate('Zhengyi') }}
                        >
                            <Text style={styles.moreText}>查看更多</Text>
                            <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.newBlackCon}>
                        {
                            data.newZhengyi.map((item, i) => {
                                return (
                                    <View style={styles.newBlackItem} key={i}>
                                        <TouchableOpacity style={styles.newBlackPlat}
                                            onPress={() => {
                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                            }}
                                        >
                                            <Text style={styles.newBlackPlatText} numberOfLines={1}>{item.plat_name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.newBlackDateText}>{item.platback}</Text>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
                <View style={styles.newBlackContainer}>
                    <View style={styles.newBlackTitle}>
                        <View style={styles.newBlackTitleLeft}>
                            <Icon name={'ico-black'} size={14} color={'#1A1A1A'} />
                            <Text style={styles.newBlackTitleLeftText}>最新黑名单平台</Text>
                        </View>
                        <TouchableOpacity style={styles.newBlackTitleRight}
                            onPress={() => { navigation.navigate('Black') }}
                        >
                            <Text style={styles.moreText}>查看更多</Text>
                            <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                        </TouchableOpacity>

                    </View>
                    <View style={styles.newBlackCon}>
                        {
                            data.newBlack.map((item, i) => {
                                return (
                                    <View style={styles.newBlackItem} key={i}>
                                        <TouchableOpacity style={styles.newBlackPlat}
                                            onPress={() => {
                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                            }}
                                        >
                                            <Text style={styles.newBlackPlatText} numberOfLines={1}>{item.plat_name}</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.newBlackDateText}>{item.platback}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <View>
                    <View style={styles.echarts}>
                        <Echarts option={PieEcharts.pieYulun(echartsData)} height={200} />
                        <View style={styles.echartsTitle}><Text style={styles.echartsTitleText}>过去48小时舆论热点分布</Text></View>
                    </View>

                    <View style={styles.totalNum}>
                        <View style={[styles.totalNumT, styles.totalNumTol]}><Text style={styles.totalNumText}>舆论总条数：<Text style={styles.totalNumTextN}>{data.numYulun.all_num}</Text></Text></View>
                        <View style={[styles.totalNumT, styles.totalNumTM]}><Text style={styles.totalNumText}>昨日条数：<Text style={styles.totalNumTextN}>{data.numYulun.date_num}</Text></Text></View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    dapanCon: {
        marginLeft: 17,
        marginBottom: 15,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statusContainer: {
        flexDirection: 'row',
    },
    statusLeft: {
        width: 94,
    },
    statusLeftTextLabel: {
        fontSize: 14,
        color: '#666',
    },
    statusLeftTextState: {
        paddingTop: 10,
        fontSize: 24,
        color: '#666',
        fontWeight: 'bold',
    },
    statusRight: {
        justifyContent: 'center',
        flex: 1,
        position: 'relative',
        paddingTop: 22,
        height: 52,
    },
    imgzhizhenContainer: {
        position: 'absolute',
        bottom: 0,
    },
    imgkedu: {
        width: 230,
        height: 30,
    },
    imgzhizhen: {
        width: 30,
        height: 30,
    },
    statusTextContainer: {
        marginTop: 12,
    },
    statusTextContainerText: {
        color: '#666',
        fontSize: 14,
        lineHeight: 18,
    },
    openBtn: {
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#83CAFF',
    },
    openBtnText: {
        fontSize: 12,
        color: '#fff',
    },
    dataList: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    list: {
        paddingBottom: 12,
        width: (Theme.screenWidth - 35) / 4,
    },
    listlabel: {
        paddingBottom: 5,
        fontSize: 12,
        color: '#bbb',
    },
    listCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listNum: {
        paddingRight: 5,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666',
    },
    listChangenum: {
        fontSize: 10,
    },
    echarts: {
        position: 'relative',
        top: -15,
        alignItems: 'center',
        width: Theme.screenWidth,
        height: 245,
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
        marginBottom: 10,
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
    totalNumTextN: {
        color: Theme.color,
    },
    newBlackContainer: {
        paddingLeft: 17,
    },
    newBlackTitle: {
        marginBottom: 18,
        paddingRight: 13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    newBlackTitleLeft: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    newBlackTitleLeftText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 5,
    },
    newBlackTitleRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        color: '#999',
        fontSize: 13,
    },
    newBlackCon: {
        marginBottom: 15,
        paddingRight: 17,
        paddingBottom: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,

    },
    newBlackItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    newBlackPlat: {
        marginRight: 5,
        width: 65,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    newBlackPlatText: {
        fontSize: 11,
        color: '#666',
    },
    newBlackDateText: {
        width:34,
        fontSize: 11,
        color: '#bbb',
    },

})