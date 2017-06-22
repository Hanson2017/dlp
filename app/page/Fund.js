import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';
import Api from '../util/api';
import Loading from '../component/Loading';

import All from './fund/all';
import List from './fund/list';


export default class FundScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综合', '稳健型', '平衡型', '收益型', '活期'],
            loading: true,
            dataSource: null,
            index: 0
        };
    }
    changeIndex(index) {
        this.setState({
            index: index
        })
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        let data = this.state.dataSource;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '示范投资', title: '示范投资' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>示范投资为贷罗盘自有资金进行投资示范，可供广大投资人参考。</Text>
                </View>
                <View style={Theme.content}>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        initialPage={this.state.index}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            {
                                this.state.loading ?
                                    <Loading />
                                    :
                                    <All data={data} navigation={navigation} />
                            }

                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            {
                                this.state.loading ?
                                    <Loading />
                                    :
                                    <List data={data.fund1} fundType={1} navigation={navigation} />
                            }
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            {
                                this.state.loading ?
                                    <Loading />
                                    :
                                    <List data={data.fund2} fundType={2} navigation={navigation} />
                            }
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            {
                                this.state.loading ?
                                    <Loading />
                                    :
                                    <List data={data.fund3} fundType={3} navigation={navigation} />
                            }
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            {
                                this.state.loading ?
                                    <Loading />
                                    :
                                    <List data={data.fund4} fundType={4} navigation={navigation} />
                            }
                        </View>


                    </ScrollableTabView>
                </View>
            </View>
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
    }
})

