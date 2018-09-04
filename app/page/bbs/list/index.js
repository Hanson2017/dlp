import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import Util from '../../../util/util';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';

import Item from '../item';

import stylesList from '../../../css/listData';


export default class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: [],
        };
    }
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>

                <View style={styles.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <View>
                                {
                                    this.props.children
                                }
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
                                    />
                                </ScrollView>
                            </View>
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
        this.getDataList()
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getDataList()
    }

    getDataList() {
        const that = this
        const { tType } = this.props;
        const url = Api.bbs + 'gettype=' + tType + '&getnum=50';

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            that.setState({
                                loading: false,
                                isRefreshing: false,
                                dataSource: responseData.forumlist,
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
    }
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 15,
        paddingLeft: 17,
        flex: 1,
        backgroundColor: '#fff',
    },

})


