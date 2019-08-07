import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, RefreshControl, StatusBar } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Drawer, Toast } from 'antd-mobile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Util from '../../../util/util';
import Header from '../../../component/navBar';
import Loading from '../../../component/loading';
import Filter from './filter';
import Contrast from './contrast';

import List from './list';

var fields = [
    {
        name: '产品名称',
        val: 'cpms',
        isShow: true
    },
    {
        name: '募集结束日期',
        val: 'mjjsrq',
        isShow: true
    },
    {
        name: '期限类型',
        val: 'qxms',
        isShow: true
    },
    {
        name: '业绩比较基准(%)',
        val: 'yjbjjz',
        isShow: true
    },
    {
        name: '发行机构',
        val: 'fxjgms',
        isShow: true
    },
    {
        name: '登记编码',
        val: 'cpdjbm',
        isShow: false
    },
    {
        name: '募集方式',
        val: 'mjfsms',
        isShow: false
    },
    {
        name: '运作模式',
        val: 'cplxms',
        isShow: false
    },
    {
        name: '投资性质',
        val: 'cptzxzms',
        isShow: false
    },
    {
        name: '募集币种',
        val: 'mjbz',
        isShow: false
    },
    {
        name: '风险等级',
        val: 'fxdjms',
        isShow: false
    },
    {
        name: '募集起始日期',
        val: 'mjqsrq',
        isShow: false
    },
    {
        name: '产品起始日期',
        val: 'cpqsrq',
        isShow: false
    },
    {
        name: '产品终止日期',
        val: 'cpyjzzrq',
        isShow: false
    },
    {
        name: '业务起始日',
        val: 'kfzqqsr',
        isShow: false
    },
    {
        name: '业务结束日',
        val: 'kfzqjsr',
        isShow: false
    },
    {
        name: '实际天数(天)',
        val: 'cpqx',
        isShow: false
    },
    {
        name: '初始净值',
        val: 'csjz',
        isShow: false
    },
    {
        name: '产品净值',
        val: 'cpjz',
        isShow: false
    },
    {
        name: '累计净值',
        val: 'ljjz',
        isShow: false
    },
    {
        name: '最近一次兑付收益率(%)',
        val: 'syl',
        isShow: false
    },
    {
        name: '收益类型',
        val: 'cpsylxms',
        isShow: false
    },
    {
        name: '投资资产类型',
        val: 'tzlxms',
        isShow: false
    },
    {
        name: '预期最高收益率(%)',
        val: 'yjkhzgnsyl',
        isShow: false
    },
    {
        name: '预期最低收益率(%)',
        val: 'yjkhzdnsyl',
        isShow: false
    }

]

export default class LicaiIndexScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoadMoreIng: false,
            isLoadMore: false,
            isRefreshing: false,
            page: 1,
            pageSize: 20,
            pageCount: 0,
            surl: '',
            orderby: '',
            dataSource: [],
            open: false,
            fields: fields,
            contrastList: [],
            updatetime: Util.setDate(new Date())
        }
    }
    onOpenChange = (...args) => {
        this.setState({ open: args[0] });
    }
    openDrawer = () => {
        this.setState({ open: true });
    }
    render() {
        const { navigation } = this.props;
        const { dataSource, contrastList, loading, updatetime } = this.state;
        return (
            <Drawer
                sidebar={<Filter fields={fields} that={this} />}
                position="right"
                open={this.state.open}
                onOpenChange={this.onOpenChange}
                drawerBackgroundColor="#fff"
                drawerWidth={Theme.screenWidth * 0.92}
            >
                <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }}>
                    <View style={Theme.container}>
                        <Header headerOpt={{ back: '银行理财产品', title: '银行理财产品', search: true }} navigation={navigation} />
                        <View style={styles.update}>
                            <Text style={[styles.updateText]}>数据来源: 中国理财网 | 更新时间：{updatetime}</Text>
                        </View>
                        <View style={Theme.content}>
                            {
                                loading ?
                                    <Loading />
                                    :
                                    <View style={styles.listContainer}>
                                        <View style={styles.filter}>
                                            <View style={styles.filterLeft}>
                                                <TouchableOpacity style={styles.sortbtn} onPress={() => { this.onSort('qxms') }} activeOpacity={0.7}>
                                                    <Text style={styles.sortbtnText}>按期限类型排序</Text>
                                                    <View style={styles.sortIcon}>
                                                        <View style={[styles.sortIconCon, styles.sortIconUp]}>
                                                            <Ionicons name={'md-arrow-dropup'} size={22} color={this.state.orderby == 'qxms' ? '#007ddc' : '#999'} />
                                                        </View>
                                                        <View style={[styles.sortIconCon, styles.sortIconDown]}>
                                                            <Ionicons name={'md-arrow-dropdown'} size={22} color={this.state.orderby == 'qxms_desc' ? '#007ddc' : '#999'} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.sortbtn} onPress={() => { this.onSort('yjbjjz') }} activeOpacity={0.7}>
                                                    <Text style={styles.sortbtnText}>按业绩比较基准排序</Text>
                                                    <View style={styles.sortIcon}>
                                                        <View style={[styles.sortIconCon, styles.sortIconUp]}>
                                                            <Ionicons name={'md-arrow-dropup'} size={22} color={this.state.orderby == 'yjbjjz' ? '#007ddc' : '#999'} />
                                                        </View>
                                                        <View style={[styles.sortIconCon, styles.sortIconDown]}>
                                                            <Ionicons name={'md-arrow-dropdown'} size={22} color={this.state.orderby == 'yjbjjz_desc' ? '#007ddc' : '#999'} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity style={styles.fliterBtn} onPress={() => this.openDrawer()}>
                                                <MaterialCommunityIcons name={'filter-outline'} size={20} color={'#007DDC'} />
                                                <Text style={styles.fliterBtnText}>筛选</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <List that={this} dataSource={dataSource} isLoadMore={this.state.isLoadMore} isLoadMoreIng={this.state.isLoadMoreIng} isRefreshing={this.state.isRefreshing} fields={this.state.fields} navigation={navigation} />

                                        <View style={styles.footer}>
                                            <View style={styles.footerLeft}>
                                                <Text style={styles.contrastText}>产品对比：</Text>
                                                <TouchableOpacity disabled={contrastList.length > 0 ? false : true} style={[styles.contrastNum, contrastList.length > 0 ? styles.contrastNumActivity : null]} onPress={() => {
                                                    this.refs.contrast.show();
                                                }}>
                                                    <Text style={styles.contrastNumText}>{contrastList.length}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity disabled={contrastList.length > 1 ? false : true} style={[styles.contrastBegin, contrastList.length > 1 ? styles.contrastBeginActivity : null]} onPress={() => {
                                                navigation.push('LicaiContrast', { contrastList: this.state.contrastList })
                                            }}>
                                                <Text style={[styles.contrastBeginText, contrastList.length > 1 ? styles.contrastBeginTextActivity : null]}>开始对比</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            }
                        </View>
                    </View>
                    <Contrast ref="contrast" that={this} contrastList={this.state.contrastList} />
                </SafeAreaView>
            </Drawer>
        )
    }
    componentDidMount() {
        this.getData(1)
    }
    addContrast = (item) => {
        if (this.state.contrastList.length >= 4) {
            Toast.info('最多只能添加四个对比', 1)
            return;
        }
        for (let i = 0; i < this.state.contrastList.length; i++) {
            if (this.state.contrastList[i].id == item.id) {
                Toast.info('该理财产品已存在', 1)
                return;
            }
        }
        this.setState({
            contrastList: [...this.state.contrastList, item]
        })
    }
    delContrast = (index) => {
        this.state.contrastList.splice(index, 1);
        this.setState({
            contrastList: this.state.contrastList
        }, () => {
            if (this.state.contrastList.length == 0) {
                this.refs.contrast.cancel();
            }
        });
    }

    // 排序
    onSort = (val) => {

        this.setState({
            orderby: this.state.orderby !== val ? val : val + '_desc'
        }, () => {
            this.getData(1)
        })
    }

    getData(type) {
        const that = this;
        let url;
        const { page, pageSize, surl, orderby, isLoadMore } = this.state;


        if (type == 1) {
            that.setState({
                dataSource: [],
                loading: true,
                page: 1,
            })
        }
        else if (type == 2) {

            if (isLoadMore) {
                this.setState({
                    isLoadMoreIng: true
                })
            }
            else {
                return false;
            }

        }
        else if (type == 3) {
            this.setState({
                isRefreshing: true,
                isLoadMore: false,
                page: 1
            })
        }

        setTimeout(() => {

            url = Api.licaiList + 'page=' + this.state.page + '&pageSize=' + pageSize + surl + '&orderby=' + orderby


            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((responseData) => {

                                console.log(responseData)

                                if (type == 3) {
                                    that.setState({
                                        dataSource: []
                                    })
                                }
                                let dataSource = that.state.dataSource;

                                dataSource = responseData.dataList !== null ? dataSource.concat(responseData.dataList) : dataSource;

                                that.setState({
                                    dataSource: dataSource,
                                    pageCount: responseData.pageCount,
                                    page: responseData.page + 1,
                                    isLoadMore: responseData.pageCount > responseData.page ? true : false
                                })
                            })
                    }
                    else {
                        console.log('网络请求失败')
                    }
                    that.setState({
                        loading: false,
                        isLoadMoreIng: false,
                        isRefreshing: false,
                    })
                })
                .catch((error) => {
                    console.log('error:', error)
                })
        }, 10)






    }
}

const styles = StyleSheet.create({
    update: {
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        color: '#83CAFF',
    },
    listContainer: {
        flex: 1,
    },
    filter: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filterLeft: {
        flexDirection: 'row',
    },
    sortbtn: {
        marginRight: 10,
        position: 'relative',
        paddingLeft: 10,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 28,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    sortbtnText: {
        fontSize: 12,
        color: '#515151',
    },
    sortIconCon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 12,
        height: 10,
        overflow: 'hidden',
        position: 'absolute',
        right: -14,
    },
    sortIconUp: {
        top: -8,
    },
    sortIconDown: {
        top: 0,
    },
    fliterBtn: {
        paddingLeft: 10,
        paddingRight: 10,
        height: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fliterBtnText: {
        paddingLeft: 2,
        fontSize: 14,
        color: '#515151',
    },


    footer: {
        height: 50,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 999,
        paddingLeft: Theme.screenWidth * 0.04
    },
    footerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contrastText: {
        fontSize: 13,
        color: '#666',
    },
    contrastNum: {
        width: 48,
        height: 28,
        backgroundColor: '#ddd',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contrastNumActivity: {
        backgroundColor: '#0096E6',
    },
    contrastNumText: {
        fontSize: 16,
        color: '#fff',
    },
    contrastBegin: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    contrastBeginText: {
        fontSize: 16,
        color: '#ddd',
    },
    contrastBeginActivity: {
        backgroundColor: '#0096E6',
    },
    contrastBeginTextActivity: {
        color: '#fff',
    },
    loadMore: {
        width: Theme.screenWidth,
        paddingTop: 15,
    },
})