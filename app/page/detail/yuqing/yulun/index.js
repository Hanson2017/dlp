import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';

import Theme from '../../../../util/theme';
import Util from '../../../../util/util';
import Loading from '../../../../component/loading';
import Item from './item';
import stylesList from '../../../../css/listData';

export default class YulunScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoadMore: true,
            isLoadMoreIng: true,
            isRefreshing: false,
            dataSource: [],
            pageCount: 1,
            pageSize: 0,
            totalNum: null,
            updatetime: null,
        }
    }
    render() {
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <View style={{ flex: 1,paddingTop:60, }}>
                    <Loading />
                </View>
            )
        }
        else {
            return (
                <ScrollView contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >

                    {
                        this.state.dataSource != null && this.state.dataSource.length > 0 ?
                            <FlatList
                                ListFooterComponent={this.ListFooterComponent.bind(this)}
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}

                            />
                            :
                            <Text style={styles.null}>暂无舆论</Text>
                    }

                </ScrollView>
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
                        <TouchableOpacity disabled={true} style={stylesList.getMore}>
                            <Text style={stylesList.getMoreText}>没有更多了</Text>
                        </TouchableOpacity>
                }
            </View>
        )

    }
    renderItem({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <Item  navigation={navigation} item={item} key={index} />
        )

    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataList(this, { column: 'detail', type: 'sent', dataName: 'dataList' }, 1, id)
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        let id = this.props.platInfo.id;
        Util.getDataList(this, { column: 'detail', type: 'sent', dataName: 'dataList' }, 3, id)
    }
    getMore() {
        let id = this.props.platInfo.id;
        Util.getDataList(this, { column: 'detail', type: 'sent', dataName: 'dataList' }, 2, id)
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingLeft: 15,
    },

    null: {
        paddingLeft: (Theme.screenWidth - 320) / 2,
        color: '#ccc',
    }
})