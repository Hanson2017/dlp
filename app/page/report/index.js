import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import List from './temp/index';

export default class ReportsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['汇总', '之家', '天眼', '贷罗盘', '融360', '星火', '羿飞', '其他']
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '数据报表', title: '数据报表' }} navigation={navigation} />
                <View style={Theme.content}>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >
                        <View style={styles.content} tabLabel='key1'>
                           <List navigation={navigation} type={'zh'} />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <List navigation={navigation} type={'wdzj'} />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                          <List navigation={navigation} type={'p2peye'} />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <List navigation={navigation} type={'dlp'} />
                        </View>
                         <View style={styles.content} tabLabel='key5'>
                           <List navigation={navigation} type={'rong360'} />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                          <List navigation={navigation} type={'xinghuo'} />
                        </View>
                        <View style={styles.content} tabLabel='key7'>
                            <List navigation={navigation} type={'yifei'} />
                        </View>
                        <View style={styles.content} tabLabel='key8'>
                           <List navigation={navigation} type={'qita'} />
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
        backgroundColor: '#fff',
    }
})

