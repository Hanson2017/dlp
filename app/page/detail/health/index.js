import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import TabBar from '../../../component/tabBar/detail';
import Loading from '../../../component/loading';
import Title from '../../../component/title';
import DashLine from '../../../component/dashLine';

import All from './all';
import Fuzhu from './fuzhu';
import Other from './other';

export default class DetailHealth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['概览', '辅助指标', '其他指标'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        const { tabNames, dataSource, loading } = this.state;
        const { platInfo } = this.props;
        return (
            <View style={styles.container}>
                {
                    loading ?
                        <Loading />
                        :
                        platInfo.platstatus == 1 ?
                            <ScrollableTabView
                                renderTabBar={() => <TabBar tabNames={tabNames} />}
                            >
                                <View style={styles.content} tabLabel='key1'>
                                    <All data={dataSource} platName={platInfo.platName} platstatus={platInfo.platstatus} />
                                </View>
                             
                                <View tabLabel='key3'>
                                    <Fuzhu data={dataSource} />
                                </View>
                                <View tabLabel='key4'>
                                    <Other data={dataSource} />
                                </View>
                            </ScrollableTabView>
                            :
                            <ScrollView  contentContainerStyle={styles.containerBlack}>
                                <View style={[Theme.box]}>
                                    <Title data={'品牌诊断'} />
                                    {
                                        dataSource.dataDetail != null && dataSource.dataDetail.brand != null ?
                                            <View style={styles.diagnoseBox}>
                                                <View style={styles.pinpaiList}>
                                                    <Text style={styles.pinpaiListDt}>股东背景</Text>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.platback == '民营' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.platback == '民营' ? styles.selectedText : null]}>民营</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.platback == '国资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.platback == '国资' ? styles.selectedText : null]}>国资</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.platback == '上市公司' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.platback == '上市公司' ? styles.selectedText : null]}>上市</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.platback == '银行' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.platback == '银行' ? styles.selectedText : null]}>银行</Text></View>
                                                </View>
                                                <View style={styles.pinpaiList}>
                                                    <Text style={styles.pinpaiListDt}>融资背景</Text>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == '暂无融资' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == '暂无融资' ? styles.selectedText : null]}>暂无</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == '天使' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == '天使' ? styles.selectedText : null]}>天使</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == 'A' || dataSource.dataDetail.brand.financing == 'Pre-A' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == 'A' || dataSource.dataDetail.brand.financing == 'Pre-A' ? styles.selectedText : null]}>A轮</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == 'B' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == 'B' ? styles.selectedText : null]}>B轮</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == 'C' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == 'C' ? styles.selectedText : null]}>C轮</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == 'D' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == 'D' ? styles.selectedText : null]}>D轮</Text></View>
                                                    <View style={[styles.pinpaiListDd, dataSource.dataDetail.brand.financing == 'IPO' ? styles.selected : null]}><Text style={[styles.pinpaiListDdText, dataSource.dataDetail.brand.financing == 'IPO' ? styles.selectedText : null]}>IPO</Text></View>
                                                </View>
                                                <View style={styles.pinpaiList}>
                                                    <Text style={styles.pinpaiListDt}>银行存管</Text>
                                                    <View style={[styles.pinpaiListDd, styles.selected]}><Text style={[styles.pinpaiListDdText, styles.selectedText]}>{dataSource.dataDetail.brand.Deposittype}</Text></View>
                                                </View>
                                                <View style={styles.rongziInfo}>
                                                    {
                                                        dataSource.dataDetail.brand.financing_info.split('<br />').map((text) => {
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


                                <View style={[Theme.box, Theme.mt10, styles.diagnoseBox]}>
                                    <View style={styles.diagnoseHeader}>
                                        <View style={styles.diagnoseHeaderIcon}>
                                            <Icon name={'zb-fumian'} size={55} color={'#b8c1c7'} />
                                        </View>
                                        <View style={styles.diagnoseHeaderRight}>
                                            <Text style={styles.titleText}>负面事件诊断</Text>

                                        </View>

                                    </View>
                                    <DashLine width={Theme.screenWidth - 34} />
                                    <View style={styles.fumianBox}>
                                        {
                                            dataSource.dataDetail.negative != '' && dataSource.dataDetail.negative != null ?
                                                dataSource.dataDetail.negative.split('<p>').map((text) => {
                                                    let list = text.split('<href>');
                                                    return (
                                                        <TouchableOpacity style={styles.fumianList}
                                                            onPress={() => {
                                                                {
                                                                    list[1] ?
                                                                        Util.Linked(list[1])
                                                                        :
                                                                        null
                                                                }
                                                            }}
                                                        >
                                                            <Text style={styles.fumianListText}>{list[0]}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                                :
                                                <Text style={styles.fumianNull}>暂无负面信息</Text>
                                        }
                                    </View>
                                    <DashLine width={Theme.screenWidth - 34} />
                                    <View style={styles.diagnoseInstruction}>

                                        <Text style={styles.diagnoseInstructionText}>说明：不断有负面信息的平台，往往是出事的前兆。</Text>

                                    </View>
                                </View>
                                {/*负面诊断 end*/}

                                <View style={[Theme.box, Theme.mt10,styles.black]}>
                                    <Icon name={'ico-close2'} size={52} color={'#1A1A1A'} />
                                    <View style={styles.blackRight}>
                                        <Text style={styles.blackText}>黑名单平台</Text>
                                        <Text style={styles.blackText}>已停止其他数据监控</Text>
                                    </View>
                                </View>
                            </ScrollView>

                }

            </View>
        )
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'health', id)
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    },
    containerBlack:{
        backgroundColor: Theme.bgColor,
    },
    black: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingLeft: 17,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomWidth:0,
    },
    blackRight: {
        marginTop:10,
        alignItems: 'center',
    },
    blackText: {
        lineHeight: 24,
        fontSize: 16,
        color: '#1A1A1A',
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
    fumianNull: {
        paddingTop:20,
        paddingBottom:20,
        fontSize: 12,
        color: '#bbb',
    },
})