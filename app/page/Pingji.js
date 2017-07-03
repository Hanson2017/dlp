import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import ListPage from '../component/listData'
import All from './pingji/All'
import Wdzj from './pingji/wdzj'
import P2peye from './pingji/p2peye'
import Dlp from './pingji/dlp'
import R360 from './pingji/r360'
import Xinghuo from './pingji/xinghuo'
import Yifei from './pingji/yifei'

export default class PingjiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综合', '之家', '天眼', '贷罗盘', '融360', '星火', '羿飞'],
            totalNum: [0, 0, 0, 0, 0, 0, 0],
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

                <Header headerOpt={{ back: '评级', title: '评级' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>参与评级平台数量：{this.state.totalNum[this.state.index]}家</Text>
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
                                type={{ column: 'pingji', type: 'all', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Wdzj}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'wdzj', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListPage
                                navigation={navigation}
                                itemRow={P2peye}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'p2peye', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Dlp}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'dlp', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListPage
                                navigation={navigation}
                                itemRow={R360}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'rong360', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Xinghuo}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'xinghuo', dataName: 'gradeList' }}
                                columnDb={false}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key7'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Yifei}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'pingji', type: 'yifei', dataName: 'gradeList' }}
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


