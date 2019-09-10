import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../../util/theme';
import Api from '../../../../util/api';
import NavBar from '../../../../component/navBar';
import Loading from '../../../../component/loading';
import Item from './item';
import stylesList from '../../../../css/listData';

export default class CommentsPage extends Component {
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
            totalNum:0,
            dataSource: [],
            activityid: 0,
            comment_field: ''
        };
    }
    componentWillMount() {

        const { params } = this.props.navigation.state;
        this.setState({
            activityid: params.activityid,
            comment_field: params.comment_field
        })
    }
    render() {
        const { loading, isRefreshing, dataSource, } = this.state;

        const { navigation } = this.props;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }} forceInset={{ bottom: 'never' }} >
                <View style={styles.container}>

                    <NavBar headerOpt={{ back: '评论列表', title: '评论列表', search: true }} navigation={navigation} />
                    <View style={[styles.content]}>
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
                                    renderItem={this.renderItem}
                                    ListFooterComponent={this.ListFooterComponent}
                                />
                        }

                    </View>
                </View>
            </SafeAreaView>
        )


    }
    renderItem = ({ item, index }) => {
        const { navigation } = this.props;
        return (
            <Item commentlNum={this.state.totalNum - index} comment={item} commentField={this.state.comment_field} navigation={navigation} />
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
    componentDidMount() {
        this.getData(1)
    }
    getData(type) {
        const that = this;
        let url;
        const { activityid, page, pageSize, isLoadMore } = this.state;


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

            url = Api.activityDetailComment + '?activityid=' + activityid + '&page=' + this.state.page + '&pageSize=' + pageSize;

           
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

                                dataSource = dataSource.concat(responseData.data);




                                that.setState({
                                    dataSource: dataSource,
                                    pageCount: responseData.pageCount,
                                    page: responseData.page + 1,
                                    totalNum:responseData.totalNum,
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
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    content: {
        padding: 12,
        flex: 1,
        backgroundColor: '#fff',
    },
})

