import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Loading from '../../component/loading';
import Util from '../../util/util'
import stylesList from '../../css/listData';

import Left from './left';
import Left2 from './left/index2';


export default class PingjiAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            isLoadMore: true,
            isLoadMoreIng: false,
            isFixed: false,
            dataSource: [],
            pageCount: 1,
            totalNum: null,
            updatetime: null,
        };
    }
    render() {
        const { navigation, itemRow, columnDb, isTags } = this.props;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                        />
                    }
                >
                    {this.props.children}
                    <View style={[styles.container]}>
                        <View style={[styles.leftContainer, this.state.isFixed ? styles.fixed : null]}>
                            {
                                isTags ?
                                    <Left2 data={this.state.dataSource} navigation={navigation} columnDb={columnDb} />
                                    :
                                    <Left data={this.state.dataSource} navigation={navigation} columnDb={columnDb} />
                            }

                        </View>
                        <View style={[styles.rightContainer]}>
                            <ScrollView horizontal={true} onScroll={this._onScroll.bind(this)}>
                                <FlatList
                                    alwaysBounceVertical={false}
                                    alwaysBounceHorizontal={true}
                                    ListHeaderComponent={itemRow.ListHeaderComponentR.bind(this)}
                                    data={this.state.dataSource}
                                    renderItem={itemRow.renderItemR.bind(this)}
                                    style={{ flexDirection: 'row', }}
                                />
                            </ScrollView>
                        </View>
                    </View>
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

                </ScrollView>
            )
        }
    }

    _onScroll(e) {
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
    componentDidMount() {
        Util.getDataList(this, this.props.type, 1)
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        Util.getDataList(this, this.props.type, 3)
    }
    getMore() {
        Util.getDataList(this, this.props.type, 2)
    }
}
const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#e0e5ea',
        height: 55,
        paddingTop: 10,
    },
    container: {
        flexDirection: 'row',
        position: 'relative',
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
    }
})
