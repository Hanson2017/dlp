import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Api from '../../../../util/api';
import Util from '../../../../util/util';
import Theme from '../../../../util/theme';
import Loading from '../../../../component/loading';

import stylesList from '../../../../css/listData';

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    render() {
        const { isHidden } = this.state;
        const { data, navigation } = this.props;
        return (
            <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                    <View style={styles.listType}>
                        <Text style={styles.listTypeText}>
                            {data.ctype == 'p2p' ? '平台' : '文章'}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.listTitle}
                        onPress={()=>{
                            if(data.ctype == 'p2p'){
                                navigation.navigate('Detail', { id: data.cid, platName: data.title })
                            }
                            else{
                                navigation.navigate('PingCeDetail', { id: data.cid })
                            }
                           
                        }}
                    >
                        <Text style={styles.listTitleText} numberOfLines={1}>{data.title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listBody}>
                    <Text style={styles.listBdText}>
                        {
                            isHidden ?
                                Util.cutText(Util.delHtmlTag(data.detail), 60)
                                :
                                Util.delHtmlTag(data.detail)
                        }
                    </Text>
                </View>
                <View style={styles.listFoot}>
                    <Text style={styles.listDate}>{Util.formatDate(data.updatetime)}</Text>
                    {
                        Util.delHtmlTag(data.detail).length > 60 ?
                            <TouchableOpacity style={styles.openBtn}
                                onPress={() => {
                                    this.setState({
                                        isHidden: !this.state.isHidden
                                    })

                                }}
                            >
                                <Icon name={isHidden ? 'triangleHollow-down' : 'triangleHollow-up'} size={12} color={'#C1C1C1'} />
                                <Text style={styles.openText}>{isHidden ? '展开' : '收起'}</Text>
                            </TouchableOpacity>
                            :
                            null
                    }


                </View>
            </View>
        )
    }
}

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: true,
            isLoadMoreIng: false,
            dataSource: [],
            pageCount: 1,
            totalNum: 0
        };
    }
    render() {
        const { navigation } = this.props;
        const { loading, dataSource } = this.state;
        return (
            <View style={styles.content}>
                {
                    loading ?
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
                            <FlatList
                                data={dataSource}
                                renderItem={this.renderItemL.bind(this)}
                                ListFooterComponent={this.ListFooterComponent.bind(this)}

                            />
                        </ScrollView>
                }
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
        this.getDataList(1)
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
        else if (type == 3) {
            that.page = 1;
            that.setState({
                isLoadMore: true,
            })
        }

        var url = Api.commentListAccount + '?memberid=' + signState.r_id;

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
                            console.log(responseData)

                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                isRefreshing: false,
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
    content: {
        paddingTop: 25,
        paddingLeft: 15,
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listHeader: {
        paddingRight:15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listType: {
        marginRight: 10,
        width: 40,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#F2F2F2',
    },
    listTitle:{
        flex:1,
    },
    listTypeText: {
        fontSize: 10,
        color: '#bbb',
    },
    listTitleText: {
        fontSize: 12,
        color: '#999',
    },
    listBody: {
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
    },
    listBdText: {
        fontSize: 12,
        color: '#333',
        lineHeight: 18,
    },
    listFoot: {
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listDate: {
        fontSize: 11,
        color: '#bbb',
    },
    openBtn: {
        flexDirection: 'row',
    },
    openText: {
        paddingLeft: 4,
        fontSize: 11,
        color: '#bbb',
    },
})