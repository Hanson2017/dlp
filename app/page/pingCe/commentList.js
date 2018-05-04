import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import Api from '../../util/api';
import Util from '../../util/util';
import Loading from '../../component/Loading';
import Header from '../../component/Header';
import Theme from '../../util/theme';
import stylesList from '../../css/listData';

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
        };
    }
    render() {
        let navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '', title: '评论', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            this.state.totalNum > 0 ?

                            <FlatList
                                data={this.state.dataSource}
                                renderItem={this.renderItemL.bind(this)}
                                ListFooterComponent={this.ListFooterComponent.bind(this)}

                            />
                            :
                            <Text>暂无评论</Text>
                    }

                    <TouchableOpacity onPress={() => {
                        if (signState != null) {
                            navigation.navigate('PingCeCommentForm', { cid: params.cid })
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
                        <Text>我要评论</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    componentDidMount() {
        this.getDataList(1)
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View>
                <Text>{item.username}</Text>
                <Text>{Util.formatDate(item.updatetime)}</Text>
                <Text>{item.detail}</Text>
            </View>
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

        let url = Api.pingCeCommentList + '?id_dlp=' + params.cid + '&page=' + that.page + '&pagesize=' + 50;

        console.log(url)

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            let dataSource = that.state.dataSource;

                            dataSource = dataSource.concat(responseData['dataList']);
                            console.log(responseData)

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