import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Util from '../../../util/util';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';
import Update from '../../listData/update';
import stylesList from '../../../css/listData';



export default class TrustListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: false,
            loading: true,
            isLoadMoreIng: false,
            isLoadMore: false,
            isRefreshing: false,
            page: 1,
            pageSize: 100,
            pageCount: 0,
            dataSource: [],
            totalNum:null,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { dataSource, loading, isLoadMore, isLoadMoreIng, isRefreshing ,totalNum,updatetime} = this.state;
        if (loading) {
            return <Loading />
        }
        else {
            return (
                <ScrollView
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <Update upDateTime={updatetime} totalNum={totalNum} />
                    <View style={[styles.container]}>
                        <View style={[styles.leftContainer, this.state.isFixed ? styles.fixed : null]}>
                            <FlatList
                                data={dataSource}
                                ListHeaderComponent={this.ListHeaderComponentL}
                                renderItem={this.renderItemL}
                            />
                        </View>
                        <View style={[styles.rightContainer]}>
                            <ScrollView horizontal={true} onScroll={this._onScroll}>
                                <FlatList
                                    data={dataSource}
                                    ListHeaderComponent={this.ListHeaderComponent}
                                    renderItem={this.renderItem}
                                    alwaysBounceVertical={false}
                                    alwaysBounceHorizontal={true}
                                    style={{ flexDirection: 'row', }}
                                />
                            </ScrollView>
                        </View>
                    </View>

                    {
                        isLoadMore ?
                            <TouchableOpacity disabled={isLoadMoreIng ? true : false} style={stylesList.getMore} onPress={this.getMore}>
                                <Text style={stylesList.getMoreText}>{isLoadMoreIng ? '正在加载...' : '加载更多'}</Text>
                            </TouchableOpacity>
                            :
                            null
                    }

                </ScrollView>
            )
        }
    }
    componentDidMount(){
        this.getData(1)
    }
    ListHeaderComponentL = () => {

        return (
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.wNo]}>排名</Text>
                <Text style={[styles.headerText, styles.wName]}>名称</Text>
            </View>
        )
    }
    renderItemL = ({ item, index }) => {
        const { navigation } = this.props;
        return (
            <View style={styles.item}>
                <Text style={[styles.itemText, styles.wNo,styles.NoText]}>{index+1}</Text>
                <TouchableOpacity onPress={() => {
                    navigation.push('TrustDetail',{ id: item.id,name:item.trust_name })
                }}>
                    <Text style={[styles.itemText, styles.wName, styles.nameText]} numberOfLines={1}>{item.trust_name}</Text>
                </TouchableOpacity>

            </View>
        )
    }
    ListHeaderComponent = () => {

        return (
            <View style={styles.header}>
                <Text style={[styles.headerText, styles.wNo]}></Text>
                <Text style={[styles.headerText, styles.wName]}></Text>
                <Text style={[styles.headerText, styles.wJly]}>2018净利润</Text>
                <Text style={[styles.headerText, styles.wYysr]}>营业收入</Text>
                <Text style={[styles.headerText, styles.wZzc]}>总资产</Text>
                <Text style={[styles.headerText, styles.wGlxtzc]}>管理信托资产</Text>
                <Text style={[styles.headerText, styles.wHypj]}>行业评级</Text>
                <Text style={[styles.headerText, styles.wJgpj]}>监管评级</Text>
            </View>
        )
    }
    renderItem = ({ item, index }) => {
       

        return (
            <View style={styles.item}>
                <Text style={[styles.itemText, styles.wNo,styles.NoText]}></Text>
                <Text style={[styles.itemText, styles.wName,styles.nameText]}></Text>
                <View style={[styles.wJly,styles.firstCon]}>
                    <Text style={[styles.itemText,styles.firstText]}>{item.profit_sum}（亿）</Text>
                    {/* <Icon style={styles.iconArrow} name={'up'} size={12} color={'#ff0063'} /> */}
                </View>
                <Text style={[styles.itemText, styles.wYysr]}>{item.incom_sum}（亿）</Text>
                <Text style={[styles.itemText, styles.wZzc]}>{item.assets_sum}（亿）</Text>
                <Text style={[styles.itemText, styles.wGlxtzc]}>{item.trust_sum}（亿）</Text>
                <Text style={[styles.itemText, styles.wHypj]}>{item.grade_ind !== ''? item.grade_ind:'-'}</Text>
                <Text style={[styles.itemText, styles.wJgpj]}>{item.grade_sup !== ''? item.grade_sup:'-'}</Text>

            </View>
        )
    }

    _onScroll = (e) => {
        var offsetX = e.nativeEvent.contentOffset.x;
        if (offsetX > 0) {
            this.setState({
                isFixed: true
            })
        }
        else {
            this.setState({
                isFixed: false
            })
        }
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

            url = Api.trustlist + '?page=' + page + '&pageSize=' + pageSize;
            

            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        response.json()
                            .then((responseData) => {
                                console.log(responseData)
                                if (type == 3) {
                                    that.setState({
                                        dataSource: []
                                    })
                                }
                                let dataSource = that.state.dataSource;

                                dataSource = responseData.dataList !== null ? dataSource.concat(responseData.dataList) : dataSource;

                                that.setState({
                                    dataSource: dataSource,
                                    totalNum:responseData.totalNum,
                                    pageCount: responseData.pageCount,
                                    page: responseData.page + 1,
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
    contentContainer: {
        backgroundColor: '#fff',
    },
    container: {
        flexDirection: 'row',
        position: 'relative',
        minWidth: Theme.screenWidth,
    },
    leftContainer: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 99,
        backgroundColor: '#fff',
    },
    rightContainer: {
        flex: 1,
    },
    fixed: {
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
    },
    item: {
        height: 40,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
    },
    headerText: {
        paddingRight: 10,
        color: '#999',
        fontSize: 11,
    },
    itemText: {
        paddingRight: 10,
        lineHeight: 16,
        fontSize: 12,
        color: '#999',
    },
    NoText: {
        color: '#666',
    },
    nameText: {
        color: '#666',
    },
    firstCon:{
        flexDirection:'row',
        alignItems:'center',
    },
    firstText:{
        width: 88,
        fontWeight:'bold',
        color:'#0096e6',
    },
    iconArrow:{
        position:'relative',
        left:-10,
    },
    wNo: {
        width: 40,
    },
    wName: {
        width: 80,
    },
    wJly: {
        width: 115,
    },
    wYysr: {
        width: 100,
    },
    wZzc: {
        width: 100,
    },
    wGlxtzc: {
        width: 110,
    },
    wHypj: {
        width: 70,
    },
    wJgpj: {
        width: 70,
    },

})
