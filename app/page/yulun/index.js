import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Echarts from 'native-echarts';
import Util from '../../util/util';
import Api from '../../util/api';
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import Loading from '../../component/loading';

import Item from './item';

import stylesList from '../../css/listData';

export default class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: true,
            isLoadMoreIng: false,
            dataSource: [],
            echartsData: [],
            dataInfo: null,
            pageCount: 1,
            totalNum: 0,
            platCount: 0,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { navigation } = this.props;
        const { updatetime } = this.state;
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '舆论分布',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: this.state.echartsData,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        return (
            <View style={Theme.container}>

                <Header headerOpt={{ back: '舆论监控', title: '舆论监控' }} navigation={navigation} />
                <View style={styles.update}>
                    <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                </View>
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            >
                                <View style={Theme.box}>
                                    <View style={styles.echarts}>
                                        <Echarts option={option} height={200} />
                                        <View style={styles.echartsTitle}><Text style={styles.echartsTitleText}>过去48小时舆论热点分布</Text></View>
                                    </View>

                                    <View style={styles.totalNum}>
                                        <View style={[styles.totalNumT, styles.totalNumTol]}><Text style={styles.totalNumText}>舆论总条数：{this.state.dataInfo.all_num}</Text></View>
                                        <View style={[styles.totalNumT, styles.totalNumTM]}><Text style={styles.totalNumText}>昨日条数：{this.state.dataInfo.date_num}</Text></View>
                                    </View>
                                </View>
                                <View style={[Theme.box,Theme.mt10,styles.yulunList]}>
                                    <FlatList
                                        data={this.state.dataSource}
                                        renderItem={this.renderItemL.bind(this)}
                                        ListFooterComponent={this.ListFooterComponent.bind(this)}

                                    />
                                </View>


                            </ScrollView>
                    }
                </View>
            </View>
        )
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        return (
           <Item data={item} navigation={navigation} />
        )
    }
    ListFooterComponent() {
        return (
            <View>
                {
                    this.state.isLoadMore ?
                        <TouchableOpacity disabled={this.state.isLoadMoreIng ? true : false} style={stylesList.getMore} onPress={() => this.getMore()}>
                            <Text style={stylesList.getMoreText}>{this.state.isLoadMoreIng ? '正在加载...' : '加载更多'}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity disabled={true} style={stylesList.getMore}>
                            <Text style={stylesList.getMoreText}>没有更多了</Text>
                        </TouchableOpacity>
                }
            </View>
        )

    }
    componentDidMount() {
        this.getDataList(1)
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getDataList(3)
    }
    getMore() {
        this.getDataList(2)
    }
    getDataList(type) {
        let that = this
        let pageCount = that.state.pageCount;

        if (type == 1) {
            that.page = 1;
            that.setState({
                loading: true
            })
        }
        else if (type == 2) {

            if (pageCount > that.page) {
                that.page++;
                that.setState({
                    isLoadMoreIng: true
                })
            }
            else {
                that.setState({
                    isLoadMore: false,
                })
            }

        }
        else if (type == 3) {
            that.page = 1;
            that.setState({
                isLoadMore: true,
            })
        }
        let url = Api.yulun + '?page=' + that.page + '&pagesize=' + 50;

        console.log(url)
        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (type == 3) {
                                that.setState({
                                    dataSource: []
                                })
                            }
                            console.log(responseData)
                            let dataSource = that.state.dataSource;
                            let echartsData = [];
                            let echartsDataList = responseData.dataView.viewlist;
                            dataSource = dataSource.concat(responseData['dataList']);
                            for (let i = 0; i < echartsDataList.length; i++) {
                                echartsData.push({ value: echartsDataList[i].date_snum, name: echartsDataList[i].platname })
                            }

                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                isRefreshing: false,
                                dataSource: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                pageSize: responseData.pageSize,
                                echartsData: echartsData,
                                dataInfo: responseData.dataView.viewinfo,
                                platCount: responseData.dataView.plat_count
                            })
                            if (that.state.pageCount == that.page) {
                                that.setState({
                                    isLoadMore: false
                                })
                            }
                            console.log(responseData)
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
}

const styles = StyleSheet.create({

    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    echarts: {
        alignItems: 'center',
        width: Theme.screenWidth,
        height: 255,
    },
    echartsTitle:{
        marginTop:15,
        width:160,
        height:22,
        borderRadius:4,
        backgroundColor:'#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    echartsTitleText:{
        fontSize:12,
        color:'#999',
    },
    totalNum: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
    },
    totalNumT: {
        height: 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalNumTol:{
        borderRightWidth:1,
        borderRightColor:'#eee',
    },
    totalNumText:{
        fontSize: 12,
        color: '#bbb',
    },
    yulunList:{
        paddingLeft:15,
    },
    
})


