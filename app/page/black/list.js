import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import Loading from '../../component/Loading';
import Util from '../../util/util'
import stylesList from '../../css/listData';

export default class BlackList extends React.Component {
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
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ marginBottom: 60, }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                    </View>
                    <FlatList
                        ListHeaderComponent={this.ListHeaderComponent.bind(this)}
                        ListFooterComponent={this.ListFooterComponent.bind(this)}
                        data={this.state.dataSource}
                        renderItem={this.renderItem.bind(this)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    />
                </View>

            )
        }
    }
    ListHeaderComponent() {
        return (
            <View style={stylesList.headerRow}>
                <Text style={[styles.tdName, stylesList.C2D3640]}>平台名称</Text>
                <Text style={[styles.tdArea, stylesList.C2D3640]}>省市</Text>
                <Text style={[stylesList.C2D3640]}>{this.props.ctype == 'black' ? '黑名单原因' : '争议时间'}</Text>
            </View>
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
    renderItem({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={styles.itemRow} key={index}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                    activeOpacity={0.6}
                >
                    <View style={{ flexDirection: 'row', }}>
                        <Text style={[styles.tdName, stylesList.C2D3640]}>{item.plat_name}</Text>
                        <Text style={[styles.tdArea, stylesList.CABB7C4]}>{item.province}/{item.city}</Text>
                        <Text style={[stylesList.tdName, stylesList.CABB7C4]}>
                            {this.props.ctype == 'black' ? item.info_operation : item.negative_time}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 7, }}>
                        <Text style={[styles.tdUrl]} numberOfLines={1}>{item.siteurl}</Text>
                        <Text style={[styles.tdGs,]} numberOfLines={1}>{item.info_yygs}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
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
    itemRow: {
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1
    },
    tdName: {
        paddingLeft: 15,
        width: 120,
    },
    tdArea: {
        width: 100,
    },
    tdUrl: {
        paddingLeft: 15,
        paddingRight: 5,
        width: 180,
        fontSize: 12,
        color: '#ccc',
    },
    tdGs: {
        flex: 1,
        fontSize: 12,
        color: '#ccc',
    }
})
