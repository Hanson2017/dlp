import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import ListPage from '../component/listData'
import All from './flow/all'
import Baidu from './flow/baidu'
import Haosou from './flow/haosou'
import Zhanzhang from './flow/zhanzhang'
import Aizhan from './flow/aizhan'
import Z76676 from './flow/76676'

export default class PingjiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综合', '百度', '好搜', '站长', '爱站', '76676'],
            totalNum: [0, 0, 0, 0, 0, 0],
            index: 0,
            ref: false
        };
    }
    changeTotalNum(totalNum) {
        this.state.totalNum[this.state.index] = totalNum
        this.setState({
            ref: !this.state.ref
        })
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>

                <Header headerOpt={{ back: '评级', title: '流量' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>流量统计平台数量：{this.state.totalNum[this.state.index]}家</Text>
                </View>
                <View style={Theme.content}>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        onChangeTab={(obj) => {
                            this.setState({
                                index: obj.i
                            })
                        }}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <ListPage
                                navigation={navigation}
                                itemRow={All}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: 'all', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Baidu}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: 'baidu', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Haosou}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: 'haosou', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Zhanzhang}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: 'zhanzhang', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Aizhan}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: 'aizhan', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Z76676}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'flow', type: '76676', dataName: 'dataList' }}
                                columnDb={false}
                            />
                        </View>
                       
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
})


