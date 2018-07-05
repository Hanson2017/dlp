import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, FlatList, RefreshControl, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../../util/api';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Loading from '../../../../component/loading';
import stylesList from '../../../../css/listData';
// import Item from '../../../pingCe/item/index2';

class Item extends React.Component {
    render() {
        const { data, navigation, borderNot, collectionDel ,that} = this.props;
        const article = data.article;
        const plats = data.plats;
        return (
            <View style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}>
                {
                    collectionDel ?
                        <TouchableOpacity style={styles.delBtn}
                            onPress={() => {
                                Alert.alert(
                                    '提示',
                                    '是否取消收藏?',
                                    [
                                        { text: '取消' },
                                        { text: '确认', onPress: that.collectionDel.bind(that, article.id) },
                                    ]
                                )
                            }}
                        >
                            <Icon name={'ico-del'} size={25} color={'#D51920'} />
                        </TouchableOpacity>
                        :
                        null
                }
                <TouchableOpacity style={[styles.listTitle, collectionDel ?{ paddingRight: 40, }:null]}
                    onPress={() => { navigation.navigate('PingCeDetail', { id: article.id }) }}
                >
                    <Text style={styles.listTitleText}>{article.title}</Text>
                </TouchableOpacity>
                <View style={[styles.listBt]}>
                    <View style={styles.platsContainer}>
                        {
                            plats !== '' && plats.length > 0 ?
                                plats.map((item, i) => {
                                    return (
                                        <TouchableOpacity style={styles.listPlatName} key={i}
                                            onPress={() => {
                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                            }}
                                        >
                                            <Text style={styles.listPlatNameText}>{item.plat_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <View style={styles.listPlatName}>
                                    <Text style={styles.listPlatNameText}>其他</Text>
                                </View>
                        }

                    </View>
                    <View style={styles.listUpdatetime}>
                        <Text style={styles.listUpdatetimeText}>{Util.formatDate(article.updatetime)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}



export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: true,
            isLoadMoreIng: false,
            dataSource: [],
            pageCount: 1,
            totalNum: 0,
            platCount: 0,
        };
    }
    render() {

        return (
            <View style={Theme.container}>

                <View style={styles.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshing}
                                        onRefresh={this.onRefresh.bind(this)}
                                    />
                                }
                            >
                                {

                                    this.state.dataSource.length != 0 ?
                                        <FlatList
                                            data={this.state.dataSource}
                                            renderItem={this.renderItemL.bind(this)}
                                            ListFooterComponent={this.ListFooterComponent.bind(this)}

                                        />
                                        :
                                        <Text style={styles.null}>暂无收藏</Text>
                                }

                            </ScrollView>
                    }
                </View>
            </View>
        )
    }
    renderItemL({ item, index }) {
        const { collectionDel, navigation } = this.props;
        return (
            <Item data={item} navigation={navigation} collectionDel={collectionDel} that={this} />
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
        let that = this;
        this.getDataList(1)
        window.EventEmitter.on('isCollection', (data) => {
            that.getDataList(1);
        })

    }
    componentWillUnmount() {
        window.EventEmitter.off('isCollection')
    }
    // 取消关注
    collectionDel(cid) {
        let that = this;
        let thatt = this.props.that;
        let  memberid = signState.r_id;
        let url = Api.collectiondel + '?cid=' + cid + '&memberid=' + memberid;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            if (responseData.result == 1) {
                                
                                thatt.toastShow('已取消收藏')
                                setTimeout(
                                    () => {                                       
                                        thatt.toastHide()
                                        that.getDataList(1);
                                    },
                                    1000
                                );
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
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getDataList(3)
    }
    getMore() {
        this.getDataList(2)
    }
    getDataList(type) {
        let that = this
        let pageCount = that.state.pageCount;

        if (type == 1) {
            that.page = 1;
            that.setState({
                loading: true,
                dataSource: [],
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
        else if (type == 3) {
            that.page = 1;
            that.setState({
                isLoadMore: true,
            })
        }
        let memberid = signState.r_id;
        var url = Api.collectionList + '?memberid=' + memberid + '&page=' + that.page + '&pagesize=50';

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

                            dataSource = dataSource.concat(responseData['dataList']);

                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                isRefreshing: false,
                                dataSource: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                platCount: responseData.dataView
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
    content: {
        paddingTop: 15,
        paddingLeft: 15,
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        position: 'relative',
        marginTop: 12,
        paddingBottom: 3,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    delBtn: {
        right: 20,
        top: 0,
        position: 'absolute',
        zIndex: 999,
    },
    listTitle: {
        marginBottom: 10,
    },
    listTitleText: {
        fontSize: 14,
        color: '#101010',
        lineHeight: 18,
    },
    listBt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    platsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listPlatName: {
        marginBottom: 5,
        marginRight: 5,
        paddingLeft: 6,
        paddingRight: 6,
        height: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listPlatNameText: {
        fontSize: 11,
        color: '#bbb',
    },
    listUpdatetime: {
        width: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    listUpdatetimeText: {
        fontSize: 11,
        color: '#bbb',
    },
    null: {
        color: '#999',
        fontSize: 12,
    }

})
