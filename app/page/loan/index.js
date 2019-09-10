import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import NavBar from '../../component/navBar';
import Loading from '../../component/loading';
import Item from './item';
import Filter from './filter';
import stylesList from '../../css/listData';


export default class LoanScreen extends Component {
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
            dataSource: [],

        }
    }
    render() {
        const { navigation } = this.props;
        const { loading, isRefreshing, dataSource } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }} >
                <NavBar headerOpt={{ back: '贷款', title: '贷款', search: true }} openControlPanel={this.props.openControlPanel} loginState={this.props.loginState} navigation={navigation} />
                <View style={[Theme.content, { overflow: 'hidden' }]}>
                    {/* <Filter filterList={['综合排序', '金额不限', '贷款类型']} /> */}
                    {
                        loading ?
                            <Loading />
                            :
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isRefreshing}
                                        onRefresh={this.onRefresh}
                                    />
                                }
                                data={dataSource}
                                renderItem={this.renderItem.bind(this)}
                                ListFooterComponent={this.ListFooterComponent}
                            />
                    }


                </View>

            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData(1)
    }
    renderItem({ item, index }) {
        const { navigation } = this.props;
        return (
            <Item navigation={navigation} key={index} data={item} />
        )
    }
    ListFooterComponent = () => {
        const { isLoadMore, isLoadMoreIng } = this.state;
        return (
            isLoadMore ?
                <TouchableOpacity disabled={isLoadMoreIng ? true : false} style={stylesList.getMore} onPress={this.getMore}>
                    <Text style={stylesList.getMoreText}>{isLoadMoreIng ? '正在加载...' : '加载更多'}</Text>
                </TouchableOpacity>
                :
                null
        )
    }
    onRefresh = () => {
        this.getData(3)
    }
    getMore = () => {
        this.getData(2)
    }
    getData(type) {
        const that = this;
        let url;
        const { page, pageSize, isLoadMore } = this.state;


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

            url = Api.loanlist + 'page=' + this.state.page + '&pageSize=' + pageSize;

            
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

})
