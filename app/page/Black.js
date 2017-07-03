import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import List from './black/list'
import ListTab from './black/listTab'

export default class BlackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['列表', '按省份', '按首字母', '按出事时间'],
            totalNum: [0, 0, 0, 0],
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

                <Header headerOpt={{ back: '黑名单', title: '黑名单' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>黑名单统计平台数量：{this.state.totalNum[this.state.index]}家</Text>
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
                            <List
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'black', type: 'all', dataName: 'dataList' }}
                                ctype={'black'}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'black', type: 'shengfen', dataName: 'dataList' }}
                                 tabWidth={{ width: (Theme.screenWidth-80)/6 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                           <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'black', type: 'zimu', dataName: 'dataList' }}
                                 tabWidth={{ width: (Theme.screenWidth-90)/7 }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                           <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'black', type: 'shijian', dataName: 'dataList' }}
                                titleText={'年'}
                                tabWidth={{width:(Theme.screenWidth-60)/4}}
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


