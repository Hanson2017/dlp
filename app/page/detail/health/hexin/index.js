import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Echarts from 'native-echarts';

import Theme from '../../../../util/theme';
import Title from '../../../../component/title';
import DashLine from '../../../../component/dashLine';
import BarChart from '../../../../echarts/bar';

export default class DetailHealthHexin extends React.Component {
    render() {
        const { data } = this.props;

        if (data.listdata != null && data.listdata.length > 0) {
            var dateTimeAll = [] //时间列表
            var dataInamount = []   //资金流
            for (var i = 0; i < data.listdata.length; i++) {
                dateTimeAll.push(data.listdata[i].date_str.substring(5));
                dataInamount.push(data.listdata[i].inamount)
            }

        }

        if (data.dataDetail != null && data.dataDetail != '') {
            var inamountInfo = data.dataDetail.inamount;  //资金流基本信息 
            var brand = data.dataDetail.brand //品牌基本信息

            var color;
            if (inamountInfo !== null) {
                if (inamountInfo.status == '强' || inamountInfo.status == '偏强' || inamountInfo.status == '极强') {
                    color = '#39B54A';
                }
                else if (inamountInfo.status == '偏若' || inamountInfo.status == '正常') {
                    color = '#FFA500';
                }
                else {
                    color = '#ED1C24';
                }
            }

        }

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[Theme.box]}>
                    <View style={styles.healthTop}>
                        <Text style={styles.healthTopText}>核心指标为安全性指标，是平台运营的核心指标，建议重点关注。</Text>
                        <Text style={styles.healthTopText}>数据说明：极强 > 强 > 偏强 > 正常 > 偏弱 > 弱 > 极弱</Text>
                    </View>
                    {
                        data.listdata != null && data.listdata.length > 0 ?
                            <View style={styles.diagnoseBox}>
                                <View style={styles.diagnoseHeader}>
                                    <View style={styles.diagnoseHeaderIcon}>
                                        <Icon name={'zb-zijin'} size={55} color={color} />
                                    </View>
                                    <View style={styles.diagnoseHeaderRight}>
                                        <Text style={styles.titleText}>资金流诊断</Text>
                                        <Text style={styles.diagnoseHeaderText}>{inamountInfo.info}</Text>
                                    </View>

                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseState}>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>状态：</Text>
                                        <View style={[styles.state, { backgroundColor: color }]}>
                                            <Text style={styles.stateText}>{inamountInfo.status}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stateList}>
                                        <Text style={styles.diagnoseStateLebelText}>后续趋势预判：</Text>
                                        <Icon name={inamountInfo.change == 'up' ? 'up' : 'down'} size={11} color={inamountInfo.change == 'up' ? Theme.upColor : Theme.downColor} />
                                    </View>
                                </View>
                                <View style={styles.echarts}>
                                    <Echarts option={BarChart.bar2('资金流(万元)', '资金流', dateTimeAll, dataInamount, 52)} height={180} />
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明：</Text>
                                    <Text style={styles.diagnoseInstructionText}>1. 如资金流长期处于正流入状态，则资金链健康；</Text>
                                    <Text style={styles.diagnoseInstructionText}>2. 如资金流长期处于负流出状态，则可能引起资金链断裂。</Text>
                                </View>
                            </View>
                            :
                            <Text style={styles.null}>暂无数据</Text>
                    }
                </View>
                {/*资金流诊断 end*/}
                <View style={[Theme.box, Theme.mt10,{borderBottomWidth:0,}]}>
                    <Title data={'品牌诊断'} />
                    {
                        data.dataDetail != null && data.dataDetail.brand != null ?
                            <View style={styles.diagnoseBox}>
                                <View style={styles.pinpaiList}>
                                    <Text style={styles.pinpaiListDt}>股东背景</Text>
                                    <View style={[styles.pinpaiListDd, brand.platback == '民营' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '民营' ? styles.selectedText : null]}>民营</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.platback == '国资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '国资' ? styles.selectedText : null]}>国资</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.platback == '上市公司' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '上市公司' ? styles.selectedText : null]}>上市</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.platback == '银行' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.platback == '银行' ? styles.selectedText : null]}>银行</Text></View>
                                </View>
                                <View style={styles.pinpaiList}>
                                    <Text style={styles.pinpaiListDt}>融资背景</Text>
                                    <View style={[styles.pinpaiListDd, brand.financing == '暂无融资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == '暂无融资' ? styles.selectedText : null]}>暂无</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == '天使' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == '天使' ? styles.selectedText : null]}>天使</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == 'A' || brand.financing == 'Pre-A' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'A' || brand.financing == 'Pre-A' ? styles.selectedText : null]}>A轮</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == 'B' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'B' ? styles.selectedText : null]}>B轮</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == 'C' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'C' ? styles.selectedText : null]}>C轮</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == 'D' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'D' ? styles.selectedText : null]}>D轮</Text></View>
                                    <View style={[styles.pinpaiListDd, brand.financing == 'IPO' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, brand.financing == 'IPO' ? styles.selectedText : null]}>IPO</Text></View>
                                </View>
                                <View style={styles.pinpaiList}>
                                    <Text style={styles.pinpaiListDt}>银行存管</Text>
                                    <View style={[styles.pinpaiListDd, styles.selected]}><Text style={[styles.pinpaiListDdText, styles.selectedText]}>{brand.Deposittype}</Text></View>
                                </View>
                                <View style={styles.rongziInfo}>
                                    {
                                        brand.financing_info.split('<br />').map((text) => {
                                            return (
                                                <Text style={styles.rongziInfoText}>{text}</Text>
                                            )
                                        })
                                    }
                                </View>
                                <DashLine width={Theme.screenWidth - 34} />
                                <View style={styles.diagnoseInstruction}>
                                    <Text style={styles.diagnoseInstructionText}>说明： 品牌背书是平台安全性的重要保障。</Text>
                                </View>
                            </View>
                            :
                            <Text style={styles.null}>暂无数据</Text>
                    }
                </View>

                {/*品牌诊断 end*/}

            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },
    healthTop: {
        paddingLeft: 17,
        paddingBottom: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    healthTopText: {
        fontSize: 11,
        color: '#999',
        lineHeight: 22.
    },
    diagnoseBox: {
        paddingLeft: 17,
        paddingRight: 17,
        paddingTop: 15,
        paddingBottom: 15,
    },
    diagnoseHeader: {
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    diagnoseHeaderIcon: {
        width: 70,
    },
    diagnoseHeaderRight: {
        flex: 1,
    },
    titleText: {
        paddingBottom: 8,
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    diagnoseHeaderText: {
        fontSize: 12,
        color: '#666',
        lineHeight: 14,
    },
    diagnoseState: {
        paddingTop: 15,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
    },
    stateList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
    },
    diagnoseStateLebelText: {
        fontSize: 12,
        color: '#999',
    },
    state: {
        width: 40,
        height: 20,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateText: {
        fontSize: 14,
        color: '#fff',
    },
    diagnoseInstruction: {
        paddingTop: 10,
    },
    diagnoseInstructionText: {
        fontSize: 11,
        color: '#bbb',
        lineHeight: 18,
    },

    pinpaiList: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    pinpaiListDt: {
        paddingRight: 10,
        lineHeight: 18,
        color: '#666',
        fontSize: 12,
    },
    pinpaiListDd: {
        marginRight: 7,
        minWidth: 33,
        paddingLeft: 3,
        paddingRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        height: 18,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    selected: {
        backgroundColor: '#4AB3FF',
    },
    pinpaiListDdText: {
        color: '#ddd',
        fontSize: 12,
    },
    selectedText: {
        color: '#fff',
    },
    rongziInfo: {
        paddingBottom: 15,
        marginTop: 15,
    },
    rongziInfoText: {
        color: '#707070',
        fontSize: 12,
        paddingBottom: 6,
    },
    null: {
        padding: 17,
        paddingTop: 10,
        color: '#bbb',
        fontSize: 14,
    },
})