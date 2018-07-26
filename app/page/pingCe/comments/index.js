import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import { SafeAreaView } from "react-navigation";

import Api from '../../../util/api';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';
import Header from '../../../component/navBar';

import Item from '../../../page/comment/item/index2';

import stylesList from '../../../css/listData';

export default class CommentsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isLoadMore: true,
            isLoadMoreIng: false,
            dataSource: [],
            pageCount: 1,
            totalNum: 0,
            ref: false,
        };
    }
    render() {
        let navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '', title: '评论', search: 'null' }} navigation={navigation} />
                    
                    <View style={styles.content}>
                        {

                            this.state.loading ?
                                <Loading />
                                :
                                <ScrollView contentContainerStyle={styles.contentContainer}>
                                    {this.state.totalNum > 0 ?

                                        <FlatList
                                            data={this.state.dataSource}
                                            renderItem={this.renderItemL.bind(this)}
                                            ListFooterComponent={this.ListFooterComponent.bind(this)}

                                        />
                                        :
                                        <Text style={styles.null}>暂无评论</Text>
                                    }
                                </ScrollView>
                        }

                    </View>
                    <View style={styles.foot}>
                        <TouchableOpacity style={styles.inputBtn} onPress={() => {
                            if (signState != null) {
                                navigation.navigate('PingCeCommentForm', { cid: params.cid,routeName:navigation.state.routeName })
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
                           
                           <Text style={styles.inputBtnText}>我也要发表评论</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    goLogin() {
        this.props.navigation.navigate('Account')
    }
    componentDidMount() {
        this.getDataList(1)
        this.subscriptions666 = [
            window.EventEmitter.on('commentAddPC', (data) => {
                this.getDataList(1)
            })
        ]
    }
    componentWillUnmount() {
        this.subscriptions666.forEach((sub) => sub.off());
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <Item data={item} navigation={navigation} leftNo={true} />
        )
    }
    ListFooterComponent() {
        const totalNum = this.state.totalNum;
        if (totalNum > 50) {
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
        else {
            return null;
        }


    }
    getDataList(type) {
        let that = this
        let pageCount = that.state.pageCount;
        const { params } = this.props.navigation.state;

        if (type == 1) {
            that.page = 1;
            that.setState({
                loading: true,
                dataSource: []
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

        let url = Api.pingCeCommentList + '?id_dlp=' + params.cid + '&page=' + that.page + '&pagesize=' + 50;

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            let dataSource = that.state.dataSource;

                            dataSource = dataSource.concat(responseData['dataList']);

                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                dataSource: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
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
    contentContainer: {
        paddingLeft: 17,
    },
    content: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    foot: {
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
        borderTopWidth: 1,
        borderTopColor: '#fdfdfd',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#fff',
    },

    inputBtn: {
        flex: 1,
        marginRight: 15,
        paddingLeft: 10,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 15,
        justifyContent: 'center',
    },
    inputBtnText: {
        fontSize: 12,
        color: '#bbb',
    },
    submitBtn: {
        position: 'absolute',
        bottom: 20,
        right: 20,
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
        paddingTop: 15,
        color: '#ccc',

    },
})