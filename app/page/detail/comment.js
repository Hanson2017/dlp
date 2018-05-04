import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl, Alert } from 'react-native';

import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';
import Title from '../../component/Title';

export default class Comment extends React.Component {
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
        let navigation = this.props.navigation;
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
                    <Title titleText={'网友评论'} />
                    {
                        this.state.dataSource != null && this.state.dataSource.length > 0 ?
                            <FlatList
                                ListFooterComponent={this.ListFooterComponent.bind(this)}
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}
                            />
                            :
                            <Text style={styles.null}>暂无评论</Text>
                    }
                    {/* <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        if (signState != null) {
                            navigation.navigate('CommentForm',{cid:platInfo.id})
                        }
                        else {
                            Alert.alert(
                                '提示',
                                '请先登录后评论！',
                                [
                                    { text: '取消' },
                                    { text: '确认', onPress: this.goLogin.bind(this) },
                                ]
                            )
                        }

                    }}>
                        <Text style={styles.submitBtnText}>我要评论</Text>
                    </TouchableOpacity> */}
                </View>
            )
        }
    }

    renderItem({ item, index }) {
        let source;
        if (item.type == '1') {
            source = require('../../../resources/images/good.png');
        }
        else if (item.type == '2') {
            source = require('../../../resources/images/average.png');
        }
        else {
            source = require('../../../resources/images/bad.png');
        }
        return (
            <View style={styles.list} key={index}>
                <View style={styles.hd}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={styles.name} numberOfLines={1}>{item.username}</Text>
                        <Image source={source} style={{ width: 16, height: 16 }} />
                    </View>
                    <View>
                        <Text style={styles.creatdate} numberOfLines={1}>{Util.formatDate(item.updatetime)}</Text>
                    </View>
                </View>
                <Text style={styles.listCon}>{item.detail}</Text>
            </ View>
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
        let id = this.props.platInfo.id;
        Util.getDataList(this, { column: 'commentListNew', type: 'comment', dataName: 'dataList' }, 1, id)
    }
    getMore() {
        let id = this.props.platInfo.id;
        Util.getDataList(this, { column: 'commentListNew', type: 'comment', dataName: 'dataList' }, 2, id)
    }
    goLogin() {
        let navigation = this.props.navigation;
        navigation.navigate('Login')
    }
}

const styles = StyleSheet.create({

    list: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f8f8f8',
    },
    hd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        width: 100,
        color: '#333',
    },
    listTitle: {
        color: '#333',
    },
    creatdate: {
        color: '#ccc',
        fontSize: 13,
    },
    listCon: {
        lineHeight: 20,
        marginTop: 6,
        color: '#777',
    },
    null: {
        padding: 10,
        color: '#ccc',
    },
    submitBtn: {
        height: 40,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtnText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    }
})