import React, { Component } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Util from '../../util/util';
import Theme from '../../util/theme';
import Api from '../../util/api';
import Loading from '../../component/loading';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import All from './temp/all';
import List from './temp/list';


export default class FundScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['总览', '1号 稳健型', '2号 平衡型', '3号 收益型'],
            loading: true,
            dataSource: null,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { tabNames, dataSource, updatetime } = this.state;
        const { navigation } = this.props;
        const { params } = navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '示范投资', title: '示范投资' }} navigation={navigation} />
                    <View style={styles.update}>
                        <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        <ScrollableTabView
                            renderTabBar={() => <TabBar tabNames={tabNames} />}
                            initialPage={params.tabId ? params.tabId : 0}
                        >
                            <View style={styles.content} tabLabel='key1'>
                                {
                                    this.state.loading ?
                                        <Loading />
                                        :
                                        <All data={dataSource} navigation={navigation} />
                                }

                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                {
                                    this.state.loading ?
                                        <Loading />
                                        :
                                        <List data={dataSource.fund1} fundType={1} navigation={navigation} />
                                }
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                {
                                    this.state.loading ?
                                        <Loading />
                                        :
                                        <List data={dataSource.fund2} fundType={2} navigation={navigation} />
                                }
                            </View>
                            <View style={styles.content} tabLabel='key4'>
                                {
                                    this.state.loading ?
                                        <Loading />
                                        :
                                        <List data={dataSource.fund3} fundType={3} navigation={navigation} />
                                }
                            </View>
                        </ScrollableTabView>
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        let url = Api.fund;

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData,
                            })
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
        flex: 1,
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

