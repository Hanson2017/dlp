import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Header from '../../component/Header';
import Theme from '../../util/theme';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar';

import Guanzhu from './guanzhu';
import Set from './set';

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['关注平台', '设置'],
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        let { params } = this.props.navigation.state;
        let tab = 0
        if (params != undefined) {
            tab = params.tab
        }
        console.log('params', params)
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '个人中心', title: '个人中心', search: true }} navigation={navigation} />
                <View style={Theme.content}>
                    <ScrollableTabView
                        initialPage={tab}
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >

                        <View style={styles.content} tabLabel='key1'>
                            <Guanzhu navigation={navigation} />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <Set navigation={navigation} />
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