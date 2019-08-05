import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";

import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Header from '../../../component/navBar/detail'
import Loading from '../../../component/loading';

export default class LicaiDetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: 0,
            dataSource: null
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            id: params.id
        })
    }
    render() {
        const { navigation } = this.props;
        const { loading, dataSource } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <StatusBar
                        backgroundColor={'#1A1A1A'}
                        barStyle="light-content"
                    />
                    <Header headerOpt={{ title: '银行产品详情', noBack: true, search: true }} navigation={navigation}  />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView contentContainerStyle={styles.contentContainer}>
                                    <View style={styles.header}>
                                        <Text style={styles.title}>{dataSource.cpms}</Text>
                                        <View style={styles.headerType}>
                                            <Text style={styles.headerTypeText}>{dataSource.cpztms}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.info}>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>登记编码:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpdjbm}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>发行机构:</Text>
                                            <Text style={styles.itemText}>{dataSource.fxjgms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>运作模式:</Text>
                                            <Text style={styles.itemText}>{dataSource.cplxms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>募集模式:</Text>
                                            <Text style={styles.itemText}>{dataSource.mjfsms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>期限类型:</Text>
                                            <Text style={styles.itemText}>{dataSource.qxms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>募集币种:</Text>
                                            <Text style={styles.itemText}>{dataSource.mjbz}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>投资性质:</Text>
                                            <Text style={styles.itemText}>{dataSource.cptzxzms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>风险等级:</Text>
                                            <Text style={styles.itemText}>{dataSource.fxdjms}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>募集起始日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.mjqsrq !== '' ? Util.formatDate2(dataSource.mjqsrq) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>募集结束日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.mjjsrq !== '' ? Util.formatDate2(dataSource.mjjsrq) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>产品起始日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpqsrq !== '' ? Util.formatDate2(dataSource.cpqsrq) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>产品结束日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpyjzzrq !== '' ? Util.formatDate2(dataSource.cpyjzzrq) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>业务起始日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.kfzqqsr !== '' ? Util.formatDate2(dataSource.kfzqqsr) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>业务结束日期:</Text>
                                            <Text style={styles.itemText}>{dataSource.kfzqjsr !== '' ? Util.formatDate2(dataSource.kfzqjsr) : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>实际天数:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpqx !== '' ? dataSource.cpqx : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>业绩比较基准:</Text>
                                            <Text style={styles.itemText}>{dataSource.yjbjjz !== '' ? dataSource.yjbjjz : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>初始净值:</Text>
                                            <Text style={styles.itemText}>{dataSource.csjz !== '' ? dataSource.csjz : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>产品净值:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpjz !== '' ? dataSource.cpjz : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>累计净值:</Text>
                                            <Text style={styles.itemText}>{dataSource.ljjz !== '' ? dataSource.ljjz : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>最后一次兑付收益率:</Text>
                                            <Text style={styles.itemText}>{dataSource.syl !== '' ? dataSource.syl : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>收益类型:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpsylxms !== '' ? dataSource.cpsylxms : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>投资资产类型:</Text>
                                            <Text style={styles.itemText}>{dataSource.tzlxms !== '' && dataSource.tzlxms !== 'N/A' ? dataSource.tzlxms : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>逾期最低收益率:</Text>
                                            <Text style={styles.itemText}>{dataSource.yjkhzdnsyl !== '' ? dataSource.yjkhzdnsyl : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>预期最高收益率:</Text>
                                            <Text style={styles.itemText}>{dataSource.yjkhzgnsyl !== '' ? dataSource.yjkhzgnsyl : '--'}</Text>
                                        </View>
                                        <View style={styles.item}>
                                            <Text style={styles.itemLabel}>销售区域:</Text>
                                            <Text style={styles.itemText}>{dataSource.cpxsqy !== '' ? dataSource.cpxsqy : '--'}</Text>
                                        </View>
                                        <Text style={styles.source}>[数据来源: 中国理财网]</Text>
                                    </View>
                                   
                                </ScrollView>
                        }

                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData();
    }
    getData() {

        const that = this
        const url = Api.licaiDetail + '?id=' + this.state.id;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {

                            if (responseData.result == 1) {
                                that.setState({
                                    dataSource: responseData.data,
                                    loading: false
                                })
                            }

                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
    showActionSheet = () => {

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    contentContainer: {
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 20,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
    },
    title: {
        lineHeight: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#515151',
    },
    headerType: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 48,
        height: 20,
        backgroundColor: '#D9A958',
        borderRadius: 8,
    },
    headerTypeText: {
        fontSize: 12,
        color: '#fff',
    },
    info:{
        padding:15,
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemLabel: {
        paddingRight: 10,
        width: 130,
        textAlign: 'right',
        fontSize: 12,
        color: '#707070',
    },
    itemText: {
        flex:1,
        fontSize: 12,
        color: '#101010',
    },
    source:{
        marginTop:10,
        fontSize:11,
        color:'#bbb',
        textAlign:'center',
    },
})