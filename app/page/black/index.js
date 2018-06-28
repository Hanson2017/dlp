import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../util/theme';
import Header from '../../component/navBar';
import TabBar from '../../component/tabBar';

import List from './temp/list';
import ListTab from './temp/listTab';
import All from './temp/list/right'

export default class BlackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['列表', '按省份', '按首字母', '按出事时间'],
            totalNum: 0,
            index: 0,
            ref: false,
            upDateTime:'',
        };
    }
    changeTotalNum(totalNum) {
        this.state.totalNum = totalNum
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
        const {tabNames,totalNum,upDateTime} = this.state;
        const {navigation} = this.props;
        return (
            <View style={[Theme.container, { backgroundColor: '#1A1A1A' }]}>

                <Header headerOpt={{ back: '黑名单', title: '黑名单' }} navigation={navigation} black={true} />
                <View style={styles.update}>
                    <Text style={styles.updateText}>更新时间：{upDateTime}</Text>
                    <Text style={[styles.updateText,{paddingLeft:10,paddingRight:10}]}>|</Text>
                    <Text style={styles.updateText}>共{totalNum}家黑名单平台</Text>
                </View>
                <View style={Theme.content}>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} black={true} />}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <List
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                itemRow={All}
                                type={{ column: 'black', type: 'all', dataName: 'dataList' }}
                                ctype={'black'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'black', type: 'shengfen', dataName: 'dataList' }}
                                tabWidth={{ width: (Theme.screenWidth - 70) / 6 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'black', type: 'zimu', dataName: 'dataList' }}
                                tabWidth={{ width: (Theme.screenWidth - 81) / 7 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListTab
                             changeTotalNum={this.changeTotalNum.bind(this)}
                             changeUpDateTime={this.changeUpDateTime.bind(this)}
                                navigation={navigation}
                                type={{ column: 'black', type: 'shijian', dataName: 'dataList' }}
                                titleText={'年'}
                                tabWidth={{ width: (Theme.screenWidth - 50) / 4 }}
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
    },
    update:{
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText:{
        fontSize:10,
        color:'#707070',
    },
})


