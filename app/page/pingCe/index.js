
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Util from '../../util/util';
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import List from './list';


export default class PingceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['热门评测', '全部评测'],
            ref: false,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { navigation } = this.props;
        const { tabNames, updatetime } = this.state;
        const { params } = this.props.navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '评测监控', title: '评测监控' }} navigation={navigation} />
                    <View style={styles.update}>
                        <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        <ScrollableTabView
                            renderTabBar={() => <TabBar tabNames={tabNames} />}
                            initialPage={params.tabId || params.tabId === 0 ? params.tabId : 1}
                            onChangeTab={(obj) => {
                                this.setState({
                                    index: obj.i
                                })
                            }}
                        >
                            <View style={styles.content} tabLabel='key1'>
                                <List navigation={navigation} type={'hot'} />
                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                <List navigation={navigation} type={'list'} />
                            </View>
                        </ScrollableTabView>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    update: {
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        color: '#83CAFF',
    }
})