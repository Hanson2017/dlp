import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../../../component/tabBar/tabQuery';
import List from './list';

export default class AccountActivityListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['全部', '待审核', '已通过', '已驳回'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        const { tabNames } = this.state;
        const { navigation } = this.props;
        return (
            <ScrollableTabView
                renderTabBar={() => <TabBar tabNames={tabNames} />}
            >
                <View style={styles.content} tabLabel='key1'>
                    <List type={-1} navigation={navigation} />
                </View>
                <View style={styles.content} tabLabel='key2'>
                    <List type={0} navigation={navigation} />
                </View>
                <View style={styles.content} tabLabel='key3'>
                    <List type={1} navigation={navigation} />
                </View>
                <View style={styles.content} tabLabel='key4'>
                    <List type={2} navigation={navigation} />
                </View>
            </ScrollableTabView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    }
})