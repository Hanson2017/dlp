import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Header from '../../../component/navBar/detail';
import Title from '../../../component/title';
import ActionShare from '../../../component/actionShare';

export default class DetailFund extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: '陆金服' + ' | 示范投资实盘', noBack: true }} navigation={navigation} showActionSheet={this.showActionSheet.bind(this)} />
                    <ActionShare ref={'ActionShare'} />
                    <ScrollView style={Theme.content}>
                        <View style={[Theme.box, styles.headBox]}>
                            <View style={[styles.titleContainer]}>
                                <View style={styles.titleLeft}>
                                    <View style={styles.titleIcon}></View>
                                    <View style={styles.titleLeftCon}><Text style={styles.titleLeftText}>实盘概况</Text></View>

                                </View>
                                <TouchableOpacity
                                    style={styles.titleRight}
                                    activeOpacity={0.5}
                                    onPress={() => {

                                    }}
                                >
                                    <View style={[styles.titleTypeNum, styles.fundType1]}><Text style={styles.titleTypeNumText}>1号</Text></View>
                                    <Text style={styles.titleMoreText}>稳健型示范投资</Text>
                                    <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.fundInfo}>
                                <View style={styles.fundInfoState}>
                                    <View style={[styles.fundInfoStateIcon, styles.bgColorNomal]}>
                                        <SimpleLineIcons name={'check'} size={30} color={'#fff'} />
                                    </View>
                                    <View style={styles.fundInfoStateR}>
                                        <Text style={[styles.fundInfoStateRText1, styles.fColorNomal]}>债转成功</Text>
                                        <Text style={[styles.fundInfoStateRText2, styles.fColorNomal]}>已提现，成功退出</Text>
                                    </View>
                                </View>
                                <View style={styles.fundInfoList}>
                                    <View style={styles.fundInfoListCon}>
                                        <View style={styles.fundInfoListHd}>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc1]}>投入本金</Text>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc2]}>在投项目</Text>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc3]}>年华收益率</Text>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc4]}>已复投次数</Text>
                                        </View>
                                        <View style={styles.fundInfoListBd}>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc1]}>￥130000</Text>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc2]}>定存宝B</Text>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc3]}>11.55%</Text>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc4]}>1</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.fundInfoListCon, { marginTop: 20, }]}>
                                        <View style={styles.fundInfoListHd}>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc1]}>已回收</Text>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc2]}>首次投资日期</Text>
                                            <Text style={[styles.fundInfoListHdText, styles.listIc3]}>本金到期日期</Text>
                                        </View>
                                        <View style={styles.fundInfoListBd}>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc1]}>￥3000</Text>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc2]}>2019-08-23</Text>
                                            <Text style={[styles.fundInfoListBdText, styles.listIc3]}>2019-08-23</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.fundReason}>
                                    <Text style={styles.fundReasonText}>投资理由：</Text>
                                    <Text style={styles.fundReasonText}>① 平安集团背景，从资历来看根正苗红，实力强劲；</Text>
                                    <Text style={styles.fundReasonText}>② 各个权威机构排行榜常年保持冠军位置；</Text>
                                    <Text style={styles.fundReasonText}>③ 体量巨大；</Text>
                                    <Text style={styles.fundReasonText}>④ 近两年IPO的可能性极大；</Text>
                                </View>
                                <TouchableOpacity style={styles.fundhtdown}>
                                    <Text style={styles.fundhtdownText}>查看出借合同</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[Theme.mt10]}>
                            <View style={[Theme.box, styles.fundLiuc]}>
                                <Title data={'详细出借流程'} />
                            </View>
                            <View style={[Theme.box, styles.fundLiucList]}>
                                <View style={styles.fundLiucListDate}>
                                    <FontAwesome name={'calendar'} size={15} color={'#999'} />
                                    <Text style={styles.fundLiucListDateText}>2018.10.25</Text>
                                </View>
                                <View style={styles.fundLiucListContent}>
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
                                            <TouchableOpacity style={styles.fundLiucListPicMore} activeOpacity={0.4}>
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
                </View>
            </SafeAreaView>
        )
    }
    showActionSheet() {

    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    headBox: {
        paddingTop: 12,
        paddingBottom: 15,
    },
    titleContainer: {
        paddingLeft: 10,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIcon: {
        marginRight: 5,
        width: 2,
        height: 14,
        backgroundColor: Theme.color
    },
    titleLeftText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleRight: {
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleMoreText: {
        color: '#999',
        fontSize: 12,
    },
    titleTypeNum: {
        marginRight: 4,
        width: 20,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
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
    titleTypeNumText: {
        fontSize: 10,
        color: '#fff',
    },
    fundInfo: {
        paddingLeft: 10,
    },
    fundInfoState: {

        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundInfoStateIcon: {
        marginRight: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    fundInfoStateR: {
        justifyContent: 'center',
    },
    fundInfoStateRText1: {
        fontSize: 14,
    },
    fundInfoStateRText2: {
        paddingTop: 7,
        fontSize: 12,
    },
    fColorNomal: {
        color: '#15BE6E',
    },
    fColorZy: {
        color: '#A81611',
    },
    fColorBlack: {
        color: '#090000',
    },
    bgColorNomal: {
        backgroundColor: '#15BE6E',
    },
    bgColorZy: {
        backgroundColor: '#A81611',
    },
    bgColorBlack: {
        backgroundColor: '#090000',
    },

    fundInfoList: {
        marginBottom: 15,
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 7,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundInfoListHd: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    fundInfoListHdText: {
        fontSize: 11,
        color: '#999',
    },
    fundInfoListBd: {
        flexDirection: 'row',
    },
    fundInfoListBdText: {
        fontSize: 14,
        color: '#666',
    },
    listIc1: {
        width: 80,
    },
    listIc2: {
        width: 100,
    },
    listIc3: {
        width: 100,

    },
    fundReason: {
        marginBottom:15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#F5F5F5',
    },
    fundReasonText: {
        fontSize: 12,
        color: '#707070',
        lineHeight: 20,
    },
    fundhtdown: {

    },
    fundhtdownText: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'underline',
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
    fundLiucListHt:{
        marginTop:25,
    },
})
