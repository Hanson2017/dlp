import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';

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
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <View style={styles.Title}>
                        <View style={styles.TitleIcon}></View>
                        <Text style={styles.TitleText}>舆论监控</Text>
                        <Text style={styles.totalNum}>舆论总条数：<Text style={{ color: '#2E99E8' }}>{this.state.totalNum}条</Text></Text>
                    </View>
                    {
                        this.state.dataSource != null && this.state.dataSource.length > 0 ?
                            <FlatList
                                ListFooterComponent={this.ListFooterComponent.bind(this)}
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            />
                            :
                            <Text style={styles.null}>暂无舆论</Text>
                    }   
                   
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
            <TouchableOpacity
                style={styles.list}
                key={index}
                onPress={() => { navigation.navigate('YulunDetail', { url: item.siteurl}) }}
                >
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDate}>{Util.formatDate(item.pubtime)}</Text>
            </ TouchableOpacity>
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
    Title: {
        position: 'relative',
        paddingLeft: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        backgroundColor: '#dfe5ea'
    },
    TitleIcon: {
        marginRight: 8,
        width: 4,
        height: 16,
        backgroundColor: '#2c3641',
    },
    TitleText: {
        color: '#2D3640',
    },
    totalNum: {
        position: 'absolute',
        top: 8,
        right: 10,
        color: '#ABB7C4',
    },
    list: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listTitle: {
        lineHeight: 20,
        color: '#333',
    },
    listDate: {
        marginTop: 10,
        color: '#ccc',
    },
    null:{
        padding:10,
        color:'#ccc',
    }
})