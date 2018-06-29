import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-navigation";

import Theme from '../../util/theme';
import Header from '../../component/navBar'
import ListPage from '../listData';
import Update from '../listData/update';

import All from './temp/all'

export default class DataScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalNum: 0,
            upDateTime: '',
        };
    }
    changeTotalNum(totalNum) {
        this.setState({
            totalNum: totalNum
        })
    }
    changeUpDateTime(upDateTime) {
        this.setState({
            upDateTime: upDateTime
        })
    }
    render() {
        let { upDateTime } = this.state;
        let navigation = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '数据', title: '数据详情' }} navigation={navigation} />
                    <View style={styles.content}>
                        <ListPage
                            navigation={navigation}
                            itemRow={All}
                            changeTotalNum={this.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'data', type: 'all', dataName: 'dataList' }}
                            columnDb={true}
                        >
                            <Update upDateTime={upDateTime} totalNum={this.state.totalNum} />
                        </ListPage>
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


