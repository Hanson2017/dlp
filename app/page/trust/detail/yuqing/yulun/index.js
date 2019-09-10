import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import Theme from '../../../../../util/theme';
import Util from '../../../../../util/util';
import Api from '../../../../../util/api';
import Loading from '../../../../../component/loading';
import Item from './item';
import stylesList from '../../../../../css/listData';

export default class YulunScreen extends React.Component {
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
        const { dataSource, isRefreshing } = this.state;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={styles.container}>

                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                        ListFooterComponent={this.ListFooterComponent.bind(this)}
                        data={this.state.dataSource}
                        renderItem={this.renderItem.bind(this)}

                    />

                </View>

            )
        }
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
                       null
                }
            </View>
        )

    }
    renderItem({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <Item navigation={navigation} item={item} key={index} />
        )

    }
    componentDidMount() {
        this.getData(1)
    }
    onRefresh() {
        this.getData(3)
    }
    getMore() {
        this.getData(2)
    }

    getData(type) {
        const that = this;
        let url;
        const { page, pageSize, isLoadMore } = this.state;
        const { id } = this.props;

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

            url = Api.trustYuqing_list + '?page=' + this.state.page + '&pageSize=' + pageSize + '&platid=' + id;

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
                                    isLoadMore: responseData.pageCount > responseData.page ? true : false,
                                    loading: false,
                                    isLoadMoreIng: false,
                                    isRefreshing: false,
                                })
                            })
                    }
                    else {
                        console.log('网络请求失败')
                    }
                    
                })
                .catch((error) => {
                    console.log('error:', error)
                })
        }, 100)
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 15,
        backgroundColor: '#fff',
    },
    null: {

        color: '#ccc',
    }
})