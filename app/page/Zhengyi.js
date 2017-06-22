import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import List from './black/list'

export default class ZhengyiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
        };
    }
    changeTotalNum(totalNum) {
        this.setState({
            totalNum: totalNum
        })
    }
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>

                <Header headerOpt={{ back: '争议', title: '争议中名单' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>争议状态统计平台数量：{this.state.totalNum}家</Text>
                </View>
                <View style={Theme.content}>
                    <List
                        navigation={navigation}
                        changeTotalNum={this.changeTotalNum.bind(this)}
                        type={{ column: 'zhengyi', type: 'all', dataName: 'dataList' }}
                        ctype={'zhengyi'}
                    />

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
})


