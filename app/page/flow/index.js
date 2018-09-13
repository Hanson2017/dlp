import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";

import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';
import ListPage from '../listData';
import Update from '../listData/update';

import All from './temp/all'
import Baidu from './temp/baidu'
import Haosou from './temp/haosou'
import Zhanzhang from './temp/zhanzhang'
import Aizhan from './temp/aizhan'

export default class FlowScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综合', '百度', '好搜', '站长', '爱站'],
            totalNum: [0, 0, 0, 0, 0],
            index: 0,
            upDateTime: '',
            ref: false
        };
    }
    changeTotalNum(totalNum) {
        this.state.totalNum[this.state.index] = totalNum
        this.setState({
            ref: !this.state.ref
        })
    }
    changeUpDateTime(upDateTime) {
        this.setState({
            upDateTime: upDateTime
        })
    }
    render() {
        let { tabNames, upDateTime } = this.state;
        let navigation = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>

                    <Header headerOpt={{ back: '评级', title: '流量监控' }} navigation={navigation} />
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
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'flow', type: 'all', dataName: 'dataList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Baidu}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'flow', type: 'baidu', dataName: 'dataList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Haosou}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'flow', type: 'haosou', dataName: 'dataList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key4'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Zhanzhang}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'flow', type: 'zhanzhang', dataName: 'dataList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key5'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Aizhan}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'flow', type: 'aizhan', dataName: 'dataList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>


                        </ScrollableTabView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


