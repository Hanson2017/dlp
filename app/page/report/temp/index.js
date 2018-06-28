import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity,RefreshControl } from 'react-native';

import Loading from '../../../component/loading'
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Api from '../../../util/api';
import stylesList from '../../../css/listData';

import Item from '../item';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            isLoadMore: true,
            isLoadMoreIng: true,
            isRefreshing: false,
            pageCount: 1,
            pageSize: 0,
            totalNum: null,
            updatetime: null,
        };
    }
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={{paddingTop:10,paddingLeft:17,flex:1}}>
                {
                    this.state.loading ?
                        <Loading />
                        :
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem.bind(this)}
                            ListFooterComponent={this.ListFooterComponent.bind(this)}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh.bind(this)}
                                />
                            }
                        />
                }
            </View>
        )
    }
    renderItem({ item, index }) {
        let navigation = this.props.navigation;
        return (
           <Item navigation={navigation} data={item} />
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
        let type = this.props.type;
        Util.getDataList(this, { column: 'getReportsList', type: type, dataName: 'dataList' }, 1)
    }
    getMore() {
        let type = this.props.type;
        Util.getDataList(this, { column: 'getReportsList', type: type, dataName: 'dataList' }, 2)
    }
    onRefresh() {
        let type = this.props.type;
        this.setState({
            isRefreshing: true,
        })
        Util.getDataList(this, { column: 'getReportsList', type: type, dataName: 'dataList' }, 3)
    }
}

const styles = StyleSheet.create({
   
})
