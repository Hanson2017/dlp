import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Loading from '../../component/loading';
import Header from '../../component/navBar';
import Item from './item';
import stylesList from '../../css/listData';

export default class PingceScreen extends React.Component {

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
        const { navigation } = this.props;
        const { updatetime } = this.state;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '热门活动', title: '热门活动' }} navigation={navigation} />
                    <View style={styles.update}>
                        <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        {
                            this.state.loading ?
                                <Loading />
                                :
                                <ScrollView>
                                    <View style={styles.totalNum}>
                                        <Text style={styles.totalNumText}>活动平台数量 65</Text>
                                    </View>
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
                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    renderItemL({ item, index }) {
        const navigation = this.props.navigation;
        return (
            <Item data={item} navigation={navigation} />
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
    listViewContent: {
        paddingLeft: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    totalNum: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
    },
    totalNumText: {
        color: '#999',
        fontSize: 11,
    },
    update: {
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        color: '#83CAFF',
    }
})