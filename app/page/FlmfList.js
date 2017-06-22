import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import Header from '../component/Header'
import Loading from '../component/Loading';
import Theme from '../util/theme';
import stylesList from '../css/listData';
import Util from '../util/util';
import Api from '../util/api';

import Item from '../component/ItemFlmf';


export default class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: [],
            totalNum: 0,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        let navigation = this.props.navigation;

        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '优惠活动', title: '优惠活动' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>活动平台数量：{this.state.totalNum}家</Text>
                </View>
                <View style={Theme.content}>
                    {this.state.loading ?
                        <Loading />
                        :
                        <View>
                            <View style={stylesList.update}>
                                <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                                <Text style={stylesList.updateText}>{this.state.updatetime}</Text>
                            </View>
                            <View style={styles.listViewContentWp}>
                                <FlatList
                                    contentContainerStyle={styles.listViewContent}
                                    data={this.state.dataSource}
                                    renderItem={this.renderItemL.bind(this)}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                />
                            </View>
                        </View>
                    }
                </View>
            </View>
        );

    }
    renderItemL({ item, index }) {
        return (
            <Item data={{item:item, index:index}} />
        )
    }
    componentDidMount() {
        this.getData()
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData()
    }
    getData() {
        let that = this;
        let url = Api.flmfList
        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                isRefreshing: false,
                                dataSource: responseData.dataList,
                                totalNum: responseData.totalNum,
                            })
                            console.log(responseData)
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
    listViewContentWp: {
        paddingLeft: 15,
        marginBottom: 100,
    },
    listViewContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    
})


