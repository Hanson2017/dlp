import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, RefreshControl, DeviceEventEmitter, Alert } from 'react-native';
import Theme from '../../../../../util/theme';
import Api from '../../../../../util/api';
import Loading from '../../../../../component/loading';
import Item from './item';
import stylesList from '../../../../../css/listData';

export default class ActiveRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            isLoadMoreIng: false,
            isLoadMore: false,
            isRefreshing: false,
            page: 1,
            pageSize: 20,
            pageCount: 0,
            totalNum: 0,
            dataSource: [],
        };
    }
    render() {
        const { loading, isRefreshing, dataSource, } = this.state;
        return (
            <View style={[Theme.mt10,Theme.content]}>
                {
                    loading ?
                        <Loading />
                        :
                        dataSource.length > 0 ?
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
                            :
                            <Text style={styles.null}>暂无活动记录</Text>
                }
            </View>

        )

    }
    renderItem = ({ item, index }) => {
        const { navigation } = this.props;
        return (
            <Item data={item} that={this} navigation={navigation} />
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
    getData(type) {
        const that = this;
        let url;
        const { page, pageSize, isLoadMore } = this.state;

        let memberId = signState.r_id;
        let tab = this.props.type;

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


            url = Api.getActivityRecordList + '?memberid=' + memberId + '&page=' + this.state.page + '&pageSize=' + pageSize + '&type=' + tab;

            

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
                                    totalNum: responseData.totalNum,
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

    componentDidMount() {
        let that = this;
        this.getData(1)
        this.subscription = DeviceEventEmitter.addListener('editComment', (data) => {
            that.getData(1)
        })
    }
    componentWillUnmount() {
        this.subscription.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },
    font11: {
        fontSize: 11,
    },
    list: {
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    listHd: {
        flexDirection: 'row',
    },
    platName: {
        width: 110,
    },
    nameText: {
        color: '#666',
        fontSize: 12,
    },
    type: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        width: 55,
        height: 16,
    },
    typeText: {
        color: '#ccc',
    },
    typeFirst: {
        borderColor: '#67CBDB',
    },
    typeRepeat: {
        borderColor: '#ff9900',
    },
    typeFirstText: {
        color: '#67CBDB',
    },
    typeRepeatText: {
        color: '#ff9900',
    },
    state: {
        width: 160,
        flexDirection: 'row',
    },
    state2: {
        flexDirection: 'row',
    },
    stateText: {
        color: '#C9C9C9',
    },
    stateTextDsh: {
        color: '#868686',
    },
    stateTextBh: {
        color: '#E62344',
    },
    stateTextTg: {
        color: '#C9C9C9',
    },
    action: {
        flexDirection: 'row',
    },
    actionEdit: {
        marginRight: 15,
    },
    actionEditText: {
        color: '#E62344',
    },
    actionDelText: {
        color: '#868686',
    },
    listBd: {
        marginTop: 12,
        paddingBottom: 4,
    },
    single: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    double: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    listBdList: {
        width: (Theme.screenWidth - 24) / 2,
        flexDirection: 'row',
    },
    label: {
        width: 65,
    },
    labelCon: {
        flex: 1,
    },
    labelText: {
        color: '#999',
    },
    labelConText: {
        color: '#666',
    },
    listNote: {
        paddingTop: 8,
        borderTopColor: '#f2f2f2',
        borderTopWidth: 1,
    },
    listNoteText: {
        color: '#AEAEAE',
    },
    loadMore: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadMoreText: {
        color: '#999',
    },
    null: {
        padding: 12,
        fontSize: 11,
        color: '#999',
    }
})

