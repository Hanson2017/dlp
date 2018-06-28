import React, { Component } from 'react';
import { Text, StyleSheet, View,TouchableOpacity,ScrollView ,FlatList,RefreshControl} from 'react-native';

import Api from '../../util/api';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import Header from '../../component/navBar';
import Item from './item/index2';
import stylesList from '../../css/listData';

export default class PingceScreen extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: true,
            isLoadMoreIng: false,
            dataSource: [],
            pageCount: 1,
            totalNum: 0,
            platCount: 0,
            ref: false,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { navigation } = this.props;
        const {  updatetime } = this.state;
       
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '全部平台点评', title: '全部平台点评' }} navigation={navigation} />
                <View style={styles.update}>
                    <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                </View>
                <View style={styles.content}>
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
        let navigation = this.props.navigation;
        return (
            <Item data={item} navigation={navigation} />

        )
    }
    ListFooterComponent() {
        return (
            <View>
                {
                    this.state.totalNum > 50 ?
                        this.state.isLoadMore ?
                            <TouchableOpacity disabled={this.state.isLoadMoreIng ? true : false} style={stylesList.getMore} onPress={() => this.getMore()}>
                                <Text style={stylesList.getMoreText}>{this.state.isLoadMoreIng ? '正在加载...' : '加载更多'}</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity disabled={true} style={stylesList.getMore}>
                                <Text style={stylesList.getMoreText}>没有更多了</Text>
                            </TouchableOpacity>
                        :
                        null
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

        var url = Api.commentList_plat + '?page=' + that.page + '&pagesize=' + 50;;

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
                            let dataSource = that.state.dataSource;

                            dataSource = dataSource.concat(responseData['dataList']);
                            console.log(responseData)

                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                isRefreshing: false,
                                dataSource: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                platCount: responseData.dataView
                            })
                            if (that.state.pageCount == that.page) {
                                that.setState({
                                    isLoadMore: false
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
}
const styles = StyleSheet.create({
    content: {
        paddingTop:15,
        paddingLeft:15,
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
    }
})