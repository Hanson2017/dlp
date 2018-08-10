import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';
import BarChart from '../../../../echarts/bar';

class List extends React.Component {
    render() {
        const { data, iconName, title } = this.props;
        var color;
        if (data.status == '强' || data.status == '偏强' || data.status == '极强') {
            color = '#39B54A';
        }
        else if (data.status == '偏弱' || data.status == '正常') {
            color = '#FFA500';
        }
        else {
            color = '#ED1C24';
        }
        return (
            <View style={styles.listItem}>
                <Icon name={iconName} size={55} color={color} />
                <Text style={styles.listItemText}>{title} <Text style={{ color: color }}> {data.status}</Text></Text>
            </View>
        )
    }
}

export default class ZonglanHealth extends React.Component {
    render() {
        const { navigation, data, dataDlp, listdata, platstatus } = this.props;

        if (data != null && data != '') {
            var inamount = data.inamount; //资金流
            var mobility = data.mobility; //流动性
            var dispersion = data.dispersion; //分散度
            var popularity = data.popularity; //人气
            var stayStill = data.stayStill; //体量
            var loyalty = data.loyalty; //忠诚度
            var growth = data.growth; //成长性
            var rate = data.rate; //收益率

            if (inamount != '' && inamount != null) {
                var color;
                if (inamount.status == '强' || inamount.status == '偏强' || inamount.status == '极强') {
                    color = '#39B54A';
                }
                else if (inamount.status == '偏弱' || inamount.status == '正常') {
                    color = '#FFA500';
                }
                else {
                    color = '#ED1C24';
                }
            }


        }
        if (listdata != null && listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataInamount = []   //资金流
            for (var i = 0; i < listdata.length; i++) {
                dateTimeAll.push(listdata[i].date_str.substring(5));
                dataInamount.push(listdata[i].inamount)
            }

        }



        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'健康度'} navigation={navigation} />
                {
                    platstatus == 1 ?
                        dataDlp !== null && data !== null ?
                            <View style={styles.content}>
                                {
                                    dataDlp.ordernum > 0 ?
                                        <View style={styles.top}>
                                            <View style={styles.topLeft}>
                                                <View style={styles.topList}>
                                                    <Text style={styles.topLabelText}>健康度指数</Text>
                                                    <Text style={styles.topLabelScore}>{dataDlp.score}</Text>
                                                </View>
                                                <View style={[styles.topList, { marginTop: 6, }]}>
                                                    <Text style={[styles.topText, styles.topTextBj]}>较上月</Text>
                                                    <Icon name={dataDlp.changnum >= 0 ? 'up' : 'down'} size={11} color={dataDlp.changnum >= 0 ? Theme.upColor : Theme.downColor} />
                                                    <Text style={styles.topText}>{Math.abs(dataDlp.changnum)}%</Text>
                                                </View>

                                            </View>
                                            <View style={styles.topRight}>
                                                <View style={[styles.topList]}>
                                                    <Text style={styles.topLabelText}>健康度排名</Text>
                                                    <Text style={styles.topLabelScore}>{dataDlp.ordernum}</Text>
                                                </View>
                                                <View style={{ marginTop: 6, }}>
                                                    <Text style={styles.topLabelText}>在统计的{dataDlp.totalNum}家平台中</Text>
                                                </View>

                                            </View>
                                        </View>
                                        :
                                        <Text style={styles.nullData}>暂无</Text>
                                }
                                {
                                    listdata != null && listdata.length > 0 ?
                                        <View style={styles.zijinliuContainer}>
                                            <View style={styles.zijinliuLeft}>
                                                <Icon name={'zb-zijin'} size={77} color={color} />
                                                <Text style={styles.listItemText}>资金流 <Text style={{ color: color }}> {inamount.status}</Text></Text>
                                            </View>
                                            <View style={styles.zijinliuRight}>
                                                <Echarts option={BarChart.bar3('资金流(万元)', '资金流', dateTimeAll, dataInamount, 52)} height={96} />
                                            </View>
                                        </View>

                                        :
                                        null
                                }

                                <View style={styles.body}>
                                    {/* <List data={inamount} iconName={'zb-zijin'} title={'资金流'} /> */}
                                    <List data={mobility} iconName={'zb-liudong'} title={'流动性'} />
                                    <List data={dispersion} iconName={'zb-fenshan'} title={'分散度'} />
                                    <List data={popularity} iconName={'zb-renqi'} title={'人气'} />
                                    <List data={stayStill} iconName={'zb-tiliang'} title={'体量'} />
                                    <List data={loyalty} iconName={'zb-zhongchengdu'} title={'忠诚度'} />
                                    <List data={growth} iconName={'zb-chengzhang'} title={'成长性'} />
                                    <List data={rate} iconName={'zb-shouyi'} title={'收益率'} />
                                </View>
                            </View>
                            :
                            <Text style={styles.null}>暂无数据</Text>
                        :
                        <View style={styles.black}>
                            <Icon name={'ico-close2'} size={26} color={'#999'} />
                            <View style={styles.blackRight}>
                                <Text style={styles.blackText}>黑名单平台</Text>
                                <Text style={styles.blackText}>已停止数据监控</Text>
                            </View>
                        </View>

                }


            </View>
        )
    }
}
const styles = StyleSheet.create({
    black: {
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 17,
        flexDirection: 'row',
    },
    blackRight: {
        marginLeft: 10,
    },
    blackText: {
        lineHeight: 24,
        fontSize: 16,
        color: '#999',
        fontWeight: 'bold',
    },
    content: {
        paddingBottom: 15,
    },
    top: {
        marginLeft:10,
        marginRight:10,
        marginBottom: 15,
        paddingTop: 20,
        paddingLeft: 17,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
    },
    topList: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topLeft: {
        width: Theme.screenWidth >= 375 ? 190 : 165,
    },
    topLabelText: {
        paddingRight: 6,
        fontSize: 12,
        color: '#999',
    },
    topLabelScore: {
        width: 60,
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },

    topText: {
        fontSize: 11,
        color: '#999',
    },
    topTextBj: {
        paddingRight: 6,
        paddingLeft: 31,
        fontSize: 12,
    },
    body: {
        paddingLeft:10,
        paddingRight:10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listItem: {
        paddingBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        width: (Theme.screenWidth-20) / 4,
    },
    listItemText: {
        paddingTop: 5,
        fontSize: 12,
        color: '#999',
    },
    zijinliuContainer:{
        marginLeft:10,
        marginRight:10,
        marginBottom:15,
        paddingBottom:15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
    },
    zijinliuLeft:{
        marginRight:10,
        width: (Theme.screenWidth-20) / 4,
        alignItems: 'center',
    },
    zijinliuRight:{
        flex:1,
    },
    null: {
        padding: 17,
        fontSize: 14,
        color: '#ccc',
    },
    nullData: {
        padding: 17,
        fontSize: 14,
        color: '#ccc',
    }

})