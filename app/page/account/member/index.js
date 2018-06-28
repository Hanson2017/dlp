import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../../util/theme';
import Header from '../../../component/navBar';
import TabBar from '../../../component/tabBar';

import Guanzhu from './guanzhu';
import Comments from './comments';
import Set from './set';

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['关注平台', '我的评论', '个人设置'],
        };
    }
    render() {
        const { tabNames } = this.state;
        const { navigation } = this.props;
        const { params } = navigation.state;
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
                            <Comments navigation={navigation} />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
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