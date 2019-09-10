import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import NavBar from '../../../../component/navBar';


export default class DetailInfo extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <NavBar headerOpt={{ back: '排行详情', title: '各行业数据' }} navigation={navigation}  />
                <ScrollView style={styles.listContainer}>
                    <View style={[styles.detailBox, { marginTop: 10, }]}>
                        <View style={styles.detailBoxHeader}><Text style={styles.detailBoxHeaderText}>费用说明</Text></View>
                        <View style={styles.detailBoxBody}>
                            <Text style={styles.detailBoxText}>利息：1%/月</Text>
                            <Text style={styles.detailBoxText}>居间服务费：2%/月</Text>
                            <Text style={styles.detailBoxText}>第三方手续费：4.5%/月</Text>
                            <Text style={styles.detailBoxText}>举例：批款2000元，期限2期。放款2000元，每期还款1150元。</Text>
                            <Text style={styles.detailBoxText}>根据最近7天实际放款，该产品月费率8.59%</Text>
                        </View>
                    </View>
                    <View style={[styles.detailBox, { marginTop: 10, }]}>
                        <View style={styles.detailBoxHeader}><Text style={styles.detailBoxHeaderText}>还款说明</Text></View>
                        <View style={styles.detailBoxBody}>
                            <Text style={[styles.detailBoxText, styles.detailBoxTextTit]}>还款方式</Text>
                            <Text style={styles.detailBoxText}>银行代扣：还款当天从绑定银行卡中自动扣款，主动扣款</Text>
                            <Text style={[styles.detailBoxText, styles.detailBoxTextTit]}>提前还款</Text>
                            <Text style={styles.detailBoxText}>单期提前还款：不支持</Text>
                            <Text style={[styles.detailBoxText, styles.detailBoxTextTit]}>逾期政策</Text>
                            <Text style={styles.detailBoxText}>逾期利息+服务费 待还本金的0.5%/日；
                            逾期利息：当前待还本金的0.04%/日；
                            逾期服务费：当前待还本金的0.46%/日；
                            催收催告服务费：第4、8天，分别一次性收取5%</Text>
                        </View>
                    </View>
                    <View style={[styles.detailBox, { marginTop: 10, }]}>
                        <View style={styles.detailBoxHeader}><Text style={styles.detailBoxHeaderText}>常见问题</Text></View>
                        <View style={styles.helpContainer}>
                            <View style={styles.helpList}>
                                <View style={styles.helpListQ}>
                                    <Icon name={'q'} size={13} color={'#507ee1'} />
                                    <Text style={styles.helpListQText}>申请流程是怎样的？</Text>
                                </View>
                                <View style={styles.helpListA}>
                                    <Icon name={'a'} size={13} color={'#ccc'} />
                                    <Text style={styles.helpListAText}>基本信息-->运营商、芝麻分-->补充信息-->绑卡-->审批-->放款</Text>
                                </View>
                            </View>
                            <View style={styles.helpList}>
                                <View style={styles.helpListQ}>
                                    <Icon name={'q'} size={13} color={'#507ee1'} />
                                    <Text style={styles.helpListQText}>申请流程是怎样的？</Text>
                                </View>
                                <View style={styles.helpListA}>
                                    <Icon name={'a'} size={13} color={'#ccc'} />
                                    <Text style={styles.helpListAText}>基本信息-->运营商、芝麻分-->补充信息-->绑卡-->审批-->放款</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    detailBox: {
        backgroundColor: '#fff',
    },
    detailBoxHeader: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    detailBoxHeaderText: {
        color: '#666',
    },
    detailBoxBody: {
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    detailBoxText: {
        lineHeight: 22,
        color: '#999',
        fontSize: 12,
    },
    detailBoxTextTit: {
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    helpContainer: {
        padding: 15,
    },
    helpList: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    helpListQ: {
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    helpListQText: {
        marginLeft: 10,
        fontSize: 13,
        color: '#333',
    },
    helpListA: {
        marginBottom: 10,
        flexDirection: 'row',
    },
    helpListAText: {
        marginLeft: 10,
        fontSize: 13,
        color: '#999',
    }
})