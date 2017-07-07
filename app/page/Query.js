
import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import Rongzi from './query/rongzi'
import Yewu from './query/yewu'
import ListTab from './query/listTab'

export default class QueryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['融资背景', '业务类型', '地区', '上线时间', '银行存管'],
            totalNum: [0, 0, 0, 0, 0],
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
    changeIndex(index) {
        this.setState({
            index: index
        })
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ title: '多维度查询', }} navigation={this.props.navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>多纬度统计平台数量：{this.state.totalNum[this.state.index]}家</Text>
                </View>
                <View style={Theme.content}>
                     
                    <ScrollableTabView
                        locked={true}
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        initialPage={params.tabId.tab1}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <Rongzi
                                navigation={navigation}
                                initialPage={params.tabId.tab2}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeIndex={this.changeIndex.bind(this)}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <Yewu
                                navigation={navigation}
                                initialPage={params.tabId.tab2}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeIndex={this.changeIndex.bind(this)}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'diqu', dataName: 'dataList' }}
                                 tabWidth={{ width: (Theme.screenWidth-70)/6 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'shangxian', dataName: 'dataList' }}
                                titleText={'年'}
                                tabWidth={{ width: (Theme.screenWidth-50)/4 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'cunguan', dataName: 'dataList' }}
                                tabWidth={{ width: (Theme.screenWidth-40)/3 }}
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


