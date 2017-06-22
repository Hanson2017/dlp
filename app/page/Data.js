import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import Theme from '../util/theme';

import ListPage from '../component/listData'
import All from './data/all'

export default class DataScreen extends React.Component {
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

                <Header headerOpt={{ back: '数据', title: '数据' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>数据统计平台数量：{this.state.totalNum}家</Text>
                </View>
                <View style={Theme.content}>
                    <ListPage
                        navigation={navigation}
                        itemRow={All}
                        changeTotalNum={this.changeTotalNum.bind(this)}
                        type={{ column: 'data', type: 'all', dataName: 'dataList' }}
                        columnDb={true}
                    />
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


