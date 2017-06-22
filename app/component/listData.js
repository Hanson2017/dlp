import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';

import Loading from './Loading';
import Util from '../util/util'
import stylesList from '../css/listData';

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
        let itemRow = this.props.itemRow;
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
                    {
                        !this.props.update ?
                            <View style={stylesList.update}>
                                <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                                <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                            </View>
                            :
                            null
                    }

                    <View style={{ flexDirection: 'row', }}>
                        <View style={this.state.isFixed ? stylesList.fixed : null}>
                            <FlatList
                                ListHeaderComponent={this.ListHeaderComponentL.bind(this)}
                                data={this.state.dataSource}
                                renderItem={this.renderItemL.bind(this)}
                            />
                        </View>
                        <View style={{ flex: 1, overflow: 'hidden' }}>
                            <FlatList
                                alwaysBounceVertical={false}
                                alwaysBounceHorizontal={true}
                                ListHeaderComponent={itemRow.ListHeaderComponentR.bind(this)}
                                data={this.state.dataSource}
                                renderItem={itemRow.renderItemR.bind(this)}
                                onScroll={this._onScroll.bind(this)}
                                style={{ flexDirection: 'row', }}
                            />
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
    ListHeaderComponentL() {

        return (
            <View style={this.props.columnDb ? styles.headerRow : stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.C2D3640]}>排名</Text>
                <Text style={[stylesList.tdName, stylesList.C2D3640]}>平台名称</Text>
            </View>
        )
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        let fundType = null;
        let flmllist = item.flmllist;
        
        switch (item.fund_type) {
            case 1:
                fundType = '示1'
                break;
            case 2:
                fundType = '示2'
                break;
            case 3:
                fundType = '示3'
                break;
            case 4:
                fundType = '活'
                break;
            default:
                fundType = null
        }

        return (
            <View style={item.fund_type != 0 || flmllist.length > 0 || this.props.columnDb || this.props.Ttype ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >
                    <Text style={[stylesList.tdID, stylesList.C2D3640]}>{index + 1}</Text>
                    <Text style={[stylesList.tdName, stylesList.C2D3640]}>{item.plat_name}</Text>
                </TouchableOpacity>
                {
                    item.fund_type != 0 || this.props.Ttype || flmllist.length > 0 ?

                        <View style={{ position: 'absolute', bottom: 10, left: 15, flexDirection: 'row', }}>
                            {
                                this.props.Ttype ?
                                    <View style={stylesList.Ttype}>
                                        <Text style={stylesList.TtypeText}>{this.props.Ttype}</Text>
                                    </View>
                                    :
                                    null
                            }

                            {
                                item.fund_type == 0 ? null
                                    :
                                    <View style={stylesList.shifan}>
                                        <Text style={stylesList.shifanText}>{fundType}</Text>
                                    </View>
                            }

                            {flmllist.length > 0 ?
                                flmllist.map((list, i) => {
                                    let url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid
                                    return (
                                        list.investtype == 1 ? null :
                                            <TouchableOpacity 
                                                style={stylesList.hongbao}
                                                onPress={() => {
                                                    Util.Linked(url)
                                                }}
                                            >
                                                <Text style={stylesList.hongbaoText}>{list.invest}奖{list.rebate}</Text>
                                            </TouchableOpacity>
                                    )

                                })
                                : null
                            }

                        </View>
                        :
                        null
                }

            </View>
        )
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
    }
})
