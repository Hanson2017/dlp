import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import Header from '../component/Header'
import Loading from '../component/Loading';
import Theme from '../util/theme';
import stylesList from '../css/listData';
import Util from '../util/util';
import Api from '../util/api';
import Echarts from 'native-echarts';

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
            platCount:0,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        let navigation = this.props.navigation;
        const option = {
            title: {
                text: '过去48小时舆论热点分布',
                x: 'center'
            },
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
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>舆论监控平台数量：{this.state.platCount}家</Text>
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
                                <View style={stylesList.update}>
                                    <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                                    <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                                </View>
                                <View style={styles.Echarts}>
                                    <Echarts option={option} height={200} />
                                    <Text style={{ color: '#ccc', marginTop: 20, fontSize: 12 }}>
                                        舆论总条数{this.state.dataInfo.all_num}条                昨日条数{this.state.dataInfo.date_num}条
                                </Text>
                                </View>
                                <FlatList
                                    data={this.state.dataSource}
                                    renderItem={this.renderItemL.bind(this)}
                                    ListFooterComponent={this.ListFooterComponent.bind(this)}

                                />
                            </ScrollView>
                    }
                </View>
            </View>
        )
    }
    renderItemL({ item, index }) {
        return (
            <TouchableOpacity style={styles.listT} activeOpacity={0.4}
                key={index}
                onPress={() => {
                    Util.Linked(item.siteurl)
                }}
            >
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.dateTime}>
                    {Util.formatDate(item.pubtime)}
                </Text>
            </TouchableOpacity>

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
                                platCount:responseData.dataView.plat_count
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
    listViewContentWp: {

        marginBottom: 60,
    },
    listViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    listT: {
        paddingLeft: 10,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2'
    },
    title: {
        lineHeight: 20,
        color: '#333',
    },
    dateTime: {
        marginTop: 5,
        color: '#ccc',
    },
    Echarts: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Theme.screenWidth,
        height: 250,
    },
})


