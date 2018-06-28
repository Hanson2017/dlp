import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Theme from '../../../../util/theme';
import stylesList from '../../../../css/listData';
import Util from '../../../../util/util';
import Loading from '../../../../component/loading';
import Item from './../../../comment/item/index2';

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
                <View style={{flex:1,paddingTop:60,}}>
                    <Loading />
                </View>
            )
        }
        else {
            return (
                <View>
                    <ScrollView contentContainerStyle={styles.contentContainer}>

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


                    </ScrollView>
                    <TouchableOpacity style={styles.submitBtn} onPress={() => {
                        if (signState != null) {
                            navigation.navigate('CommentForm', { cid: platInfo.id, platName: platInfo.platName })
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
                        <Icon name={'comment-review'} size={26} color={'#fff'} />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    renderItem({ item, index }) {
        let source;

        return (
            <Item data={item} navigation={this.props.navigation} leftNo={true} />

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
        this.subscriptions444 = [
            window.EventEmitter.on('commentAdd', (data) => {
                Util.getDataList(this, { column: 'commentListNew', type: 'comment', dataName: 'dataList' }, 1, id)
            })
        ]
    }
    componentWillUnmount() {
        this.subscriptions444.forEach((sub) => sub.off());
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
    contentContainer: {
        paddingLeft: 15,
    },
    submitBtn: {
        position: 'absolute',
        bottom: 25,
        right: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Theme.color,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#aaa',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
    },
    null: {
        paddingLeft: (Theme.screenWidth - 240) / 2,
        color: '#ccc',
    }
})